import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { firestore } from 'firebase/app';

import { ResponseReverseGeocode, ServiceBigDataCloud } from '@theory/bigdatacloud';

import { ActionCityCreate, ActionCityWatch } from './city.actions';
import { StateCityModel } from './city.state.model';
import { StateCityOptions } from './city.state.options';
import { StateLocation } from '@theory/capacitor';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';
import { CityInfo, StreamInterest } from '@firefly/cloud';
import { ServiceLocation } from '@firefly/core/services';
import { Collection } from '@firefly/core/enums';
import { ActionCityStreamSetData } from '../../child/city-stream/city-stream.actions';
import { ServiceFirestoreBase } from '@theory/firebase';

@State<StateCityModel>(StateCityOptions)
@Injectable()
export class StateCity implements NgxsOnInit
{
    @Selector() static city(state: StateCityModel)     : CityInfo           { return state.city; }
    @Selector() static cityId(state: StateCityModel)   : string             { const city: CityInfo = StateCity.city(state); return city == null ? null : city.id; }
    @Selector() static found(state: StateCityModel)    : boolean            { return StateCity.city(state) != null; }
    @Selector() static isNew(state: StateCityModel)    : boolean            { return state.isNew; }
    @Selector() static geopoint(state: StateCityModel) : firestore.GeoPoint { return state.geopoint; }

    constructor
    (
        private bigdatacloud : ServiceBigDataCloud,
        private location     : ServiceLocation,
        private store        : Store,
        private angularfire  : AngularFirestore
    ) { }

    public ngxsOnInit(context: StateContext<StateCityModel>)
    {
        context.dispatch(new ActionCityWatch());
    }

    @Action(ActionCityWatch, { cancelUncompleted: true })
    watchLocation({ dispatch, patchState }: StateContext<StateCityModel>)
    {
        return this.store.select(StateLocation.location).
        pipe
        (
            filter((location: GeolocationPosition) =>
                location != null
            ),
            map((location: GeolocationPosition) =>
                new firestore.GeoPoint(location.coords.latitude, location.coords.longitude)
            ),
            tap((geopoint: firestore.GeoPoint) =>
                patchState({ geopoint })
            ),
            switchMap((geopoint: firestore.GeoPoint) =>
                this.bigdatacloud.reverseGeocode(geopoint.latitude, geopoint.longitude).
                pipe
                (
                    switchMap((response: ResponseReverseGeocode) =>
                        this.location.cityInfo(response)
                    ),
                    tap((city: CityInfo) =>
                        patchState(({ geopoint, city }))
                    ),
                    switchMap((city: CityInfo) =>
                        ServiceFirestoreBase.documentGet(this.angularfire, Collection.Streams, city.id).
                        pipe
                        (
                            tap((snapshot: firestore.DocumentSnapshot) =>
                                patchState(({ isNew: !snapshot.exists }))
                            ),
                            switchMap((snapshot: firestore.DocumentSnapshot) =>
                                snapshot.exists ?
                                    dispatch(new ActionCityStreamSetData(snapshot.data(), true)) :
                                    dispatch(new ActionCityCreate(city))
                                )
                        )
                    )
                )
            )
        );
    }

    @Action(ActionCityCreate)
    createCity({ dispatch }: StateContext<StateCityModel>, { city }: ActionCityCreate)
    {
        return ServiceFirestoreBase.documentGet<CityInfo>(this.angularfire, Collection.Cities, city.id).
        pipe
        (
            switchMap(() =>
                ServiceFirestoreBase.documentWatch<Record<string, StreamInterest>>(this.angularfire, Collection.Streams, city.id)
            ),
            filter((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.exists
            ),
            take(1),
            switchMap((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                dispatch(new ActionCityStreamSetData(snapshot.data(), true))
            )
        );
    }
}
