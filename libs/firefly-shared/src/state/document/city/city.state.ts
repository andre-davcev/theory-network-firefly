import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentSnapshot
} from '@angular/fire/compat/firestore';
import { GeoPoint, serverTimestamp } from '@angular/fire/firestore';
import { Position } from '@capacitor/geolocation';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CityInfo, Collection, StreamInterest, User } from '@firefly/cloud';
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
  @Selector() static city(state: StateCityModel): CityInfo {
    return state.city;
  }
  @Selector() static cityId(state: StateCityModel): string {
    const city: CityInfo = StateCity.city(state);
    return city == null ? null : city.id;
  }
  @Selector() static found(state: StateCityModel): boolean {
    return StateCity.city(state) != null;
  }
  @Selector() static isNew(state: StateCityModel): boolean {
    return state.isNew;
  }
  @Selector() static geopoint(state: StateCityModel): GeoPoint {
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
      filter((location: Position) => location != null),
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
              ServiceFirestoreBase.documentGet(
                this.angularfire,
                Collection.Streams,
                city.id
              ).pipe(
                tap((snapshot: FirestoreDocumentSnapshot) =>
                  patchState({ isNew: !snapshot.exists })
                ),
                switchMap((snapshot: FirestoreDocumentSnapshot) =>
                  snapshot.exists
                    ? dispatch(
                        new ActionCityStreamSetData(snapshot.data(), true)
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
        ServiceFirestoreBase.documentWatch<Record<string, StreamInterest>>(
          this.angularfire,
          Collection.Streams,
          city.id
        )
      ),
      filter(
        (snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
          snapshot.exists
      ),
      take(1),
      switchMap((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
        dispatch(new ActionCityStreamSetData(snapshot.data(), true))
      )
    );
  }
}
