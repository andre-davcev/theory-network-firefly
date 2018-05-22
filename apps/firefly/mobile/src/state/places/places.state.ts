import {State, Action, Store, StateContext, Selector} from '@ngxs/store';
import { PlaceSearch, PlaceDetails } from './places.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/env';
import { StateLocation } from '../location/location.state';
import { GeolocationPosition } from '@capacitor/core';
import { ResponseVenueSearch } from '../../foursquare/response-venue-search.model';

export interface StatePlacesModel
{
    searching : boolean;
    results   : Array<any>;
}

@State<StatePlacesModel>
({
    name : 'places',

    defaults :
    {
        searching : false,
        results   : []
    }
})

export class StatePlaces
{
    @Selector() static searching(state: StatePlacesModel) {return state.searching;}
    @Selector() static results(state: StatePlacesModel)   {return state.results;}

    constructor(private http: HttpClient, private store: Store) {}

    @Action(PlaceSearch)
    placeSearch({ getState, patchState }: StateContext<StatePlacesModel>, { payload }: PlaceSearch)
    {
        const searchText : string              = payload == null ? '' : payload.trim();
        const location   : GeolocationPosition = this.store.selectSnapshot(StateLocation.location);

        if (searchText.length === 0)
        {
            patchState({results: []});
        }
        else
        {
            return this.http.get(`${environment.apis.places.url}/explore`,
            {
                params :
                {
                    client_id     : environment.apis.places.clientId,
                    client_secret : environment.apis.places.clientSecret,
                    ll            : `${location.coords.latitude},${location.coords.longitude}`,
                    intent        : 'checkin',
                    radius        : '32000',
                    limit         : '5',
                    v             : new Date().toISOString().slice(0,10).split('-').join(''),
                    query         : searchText
                }
            }).pipe
            (
                tap((results: ResponseVenueSearch) =>
                {
                    console.log(results);
                })
            )
        }
    }
}
