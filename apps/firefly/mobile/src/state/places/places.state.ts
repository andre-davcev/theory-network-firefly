import {State, Action, Store, StateContext, Selector} from '@ngxs/store';
import { PlacesInitialize, AutocompleteBind, AutocompleteUnbind } from './places.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { tap } from 'rxjs/operators';

export interface StatePlacesModel
{
    loading      : boolean;
    autocomplete : google.maps.places.Autocomplete;
    results      : Array<string>;
}

@State<StatePlacesModel>
({
    name : 'places',

    defaults :
    {
        autocomplete : undefined,
        loading      : false,
        results      : []
    }
})

export class StatePlaces
{
    @Selector() static loading(state: StatePlacesModel) {return state.loading;}
    @Selector() static results(state: StatePlacesModel) {return state.results;}

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

    @Action(PlacesInitialize)
    placesInitialize({ patchState }: StateContext<StatePlacesModel>)
    {
        patchState({loading: true});

        return fromPromise(this.mapsAPILoader.load()).pipe
        (
            tap(() => patchState({loading: false}))
        );
    }

    @Action(AutocompleteBind)
    autocompleteBind({ patchState }: StateContext<StatePlacesModel>,  { payload }: AutocompleteBind)
    {
        const autocomplete: google.maps.places.Autocomplete = new google.maps.places.Autocomplete(payload);

        patchState({autocomplete});

        autocomplete.addListener('place_changed', () =>
        {
            this.ngZone.run(() =>
            {
                const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                console.log(place);
                //verify result
                if (place.geometry === undefined || place.geometry === null)
                {
                    return;
                }
            });
        });
    }

    @Action(AutocompleteUnbind)
    autocompleteUnbind({ getState, patchState }: StateContext<StatePlacesModel>)
    {
        const state: StatePlacesModel = getState();

        getState().autocomplete.unbindAll();

        patchState({autocomplete: undefined});
    }
}
