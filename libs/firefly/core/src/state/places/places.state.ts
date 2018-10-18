import { State, Action, Store, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GeolocationPosition } from '@capacitor/core';

import { FoursquareResponseVenueSearch } from '@theory/foursquare';

import {
  environmentDev as environment,
  ActionPlaceSearch,
  StateLocation,
  StatePlacesModel,
  StatePlacesOptions
} from '@firefly/core';

@State<StatePlacesModel>(StatePlacesOptions)

export class StatePlaces
{
    @Selector() static searching(state: StatePlacesModel) {return state.searching;}
    @Selector() static results(state: StatePlacesModel)   {return state.results;}

    constructor(private http: HttpClient, private store: Store) {}

    @Action(ActionPlaceSearch)
    placeSearch({ patchState }: StateContext<StatePlacesModel>, { payload }: ActionPlaceSearch)
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
                tap((results: FoursquareResponseVenueSearch) =>
                {
                    console.log(results);
                })
            )
        }
    }
}
