import { State, Action, Store, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GeolocationPosition } from '@capacitor/core';

import { StateLocation } from '@theory/capacitor';

import { StatePlacesModel } from './places.state.model';
import { StatePlacesOptions } from './places.state.options';
import { ActionPlaceSearch } from './places.actions';

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
            return patchState({results: []});
        }
        else
        {

        }
    }
}
