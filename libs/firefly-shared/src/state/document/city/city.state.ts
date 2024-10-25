import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentSnapshot
} from '@angular/fire/compat/firestore';
import { GeoPoint, serverTimestamp } from '@angular/fire/firestore';
import { Position } from '@capacitor/geolocation';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CityInfo, Collection, StreamList, User } from '@firefly/cloud';
import {
  ResponseReverseGeocode,
  ServiceBigDataCloud
} from '@theory/bigdatacloud';
import { StateLocation } from '@theory/capacitor';
import {
  DocumentSnapshot as FirestoreDocumentSnapshot,
  ServiceFirestoreBase
} from '@theory/firebase';

import { ServiceLocation } from '../../../services';
import { ActionCityStreamSetData } from '../../child/city-stream/city-stream.actions';
import { ActionCityCreate, ActionCityWatch } from './city.actions';
import { StateCityModel } from './city.state.model';
import { StateCityOptions } from './city.state.options';

@State<StateCityModel>(StateCityOptions)
@Injectable()
export class StateCity {
  @Selector() static city(state: StateCityModel): CityInfo | null {
    return state.city;
  }
  @Selector() static cityId(state: StateCityModel): string | null {
    const city: CityInfo | null = StateCity.city(state);
    return city == null ? null : city.id;
  }
  @Selector() static found(state: StateCityModel): boolean {
    return StateCity.city(state) != null;
  }
  @Selector() static isNew(state: StateCityModel): boolean {
    return state.isNew;
  }
  @Selector() static geopoint(state: StateCityModel): GeoPoint | null {
    return state.geopoint;
  }

  constructor(
    private bigdatacloud: ServiceBigDataCloud,
    private location: ServiceLocation,
    private store: Store,
    private angularfire: AngularFirestore
  ) {}

  @Action(ActionCityWatch, { cancelUncompleted: true })
  cityWatch({ dispatch, patchState }: StateContext<StateCityModel>) {
    return this.store.select(StateLocation.location).pipe(
      filter((location: Position | null) => location != null),
      map((location: Position | null) => location as Position),
      map(
        (location: Position) =>
          new GeoPoint(location.coords.latitude, location.coords.longitude)
      ),
      tap((geopoint: GeoPoint) => patchState({ geopoint })),
      switchMap((geopoint: GeoPoint) =>
        this.bigdatacloud
          .reverseGeocode(geopoint.latitude, geopoint.longitude)
          .pipe(
            switchMap((response: ResponseReverseGeocode) =>
              this.location.cityInfo(response)
            ),
            tap((city: CityInfo) => patchState({ geopoint, city })),
            switchMap((city: CityInfo) =>
              ServiceFirestoreBase.documentGet<Record<string, StreamList>>(
                this.angularfire,
                Collection.ListStreams,
                city.id
              ).pipe(
                tap(
                  (
                    snapshot: FirestoreDocumentSnapshot<
                      Record<string, StreamList>
                    >
                  ) => patchState({ isNew: !snapshot.exists })
                ),
                switchMap(
                  (
                    snapshot: FirestoreDocumentSnapshot<
                      Record<string, StreamList>
                    >
                  ) =>
                    snapshot.exists
                      ? dispatch(
                          new ActionCityStreamSetData(
                            snapshot.data() as Record<string, StreamList>,
                            true
                          )
                        )
                      : dispatch(new ActionCityCreate(city))
                )
              )
            )
          )
      )
    );
  }

  @Action(ActionCityCreate)
  createCity(
    { dispatch }: StateContext<StateCityModel>,
    { city }: ActionCityCreate
  ) {
    const user: User = {
      id: 'anonymous',
      city,
      dateUpdated: serverTimestamp()
    } as User;

    return ServiceFirestoreBase.documentPatch<User>(
      this.angularfire,
      Collection.Users,
      user
    ).pipe(
      switchMap(() =>
        ServiceFirestoreBase.documentWatch<Record<string, StreamList>>(
          this.angularfire,
          Collection.ListStreams,
          city.id
        )
      ),
      filter(
        (snapshot: DocumentSnapshot<Record<string, StreamList>>) =>
          snapshot.exists
      ),
      take(1),
      switchMap((snapshot: DocumentSnapshot<Record<string, StreamList>>) =>
        dispatch(
          new ActionCityStreamSetData(
            snapshot.data() as Record<string, StreamList>,
            true
          )
        )
      )
    );
  }
}
