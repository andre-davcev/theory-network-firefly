import {State, Action, Store, StateContext, Selector} from '@ngxs/store';
import { PlacesInitialize, PlacesAutocompleteBind, PlacesAutocompleteUnbind, PlaceSearch, PlaceSearchExtended } from './places.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { tap } from 'rxjs/operators';

export interface StatePlacesModel
{
    loading      : boolean;
    autocomplete : google.maps.places.Autocomplete;
    search       : google.maps.places.AutocompleteService;
    results      : Array<google.maps.places.QueryAutocompletePrediction>;
}

@State<StatePlacesModel>
({
    name : 'places',

    defaults :
    {
        autocomplete : undefined,
        search       : undefined,
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
            tap(() => patchState({loading: false, search: new google.maps.places.AutocompleteService()}))
        );
    }

    @Action(PlacesAutocompleteBind)
    autocompleteBind({ patchState }: StateContext<StatePlacesModel>,  { payload }: PlacesAutocompleteBind)
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

    @Action(PlacesAutocompleteUnbind)
    autocompleteUnbind({ getState, patchState }: StateContext<StatePlacesModel>)
    {
        const state: StatePlacesModel = getState();

        getState().autocomplete.unbindAll();

        patchState({autocomplete: undefined});
    }

    @Action(PlaceSearch)
    placeSearch({ getState, patchState }: StateContext<StatePlacesModel>, { payload }: PlaceSearch)
    {
        const results = (predictions, status) =>
        {
            if (status != google.maps.places.PlacesServiceStatus.OK)
            {
                patchState({results: []});
            }
            else
            {
                patchState({results: predictions});
            }
        };

        if (payload == null || payload.trim().length === 0)
        {
            patchState({results: []});
        }
        else
        {
            getState().search.getPlacePredictions({ input: payload }, results);
        }
    }

    @Action(PlaceSearchExtended)
    placeSearchExtended({ getState, patchState }: StateContext<StatePlacesModel>, { payload }: PlaceSearchExtended)
    {
        const results = (predictions, status) =>
        {
            if (status != google.maps.places.PlacesServiceStatus.OK)
            {
                patchState({results: []});
            }
            else
            {
                patchState({results: predictions});
            }
        };

        if (payload == null || payload.trim().length === 0)
        {
            patchState({results: []});
        }
        else
        {
            getState().search.getQueryPredictions({ input: payload }, results);
        }
    }
}
