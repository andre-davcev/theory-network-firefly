
import { State, Selector, Action, StateContext, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { StateLocation } from '@theory/capacitor';
import { LngLatLike } from 'mapbox-gl';
import { LngLatLiteral, Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { tap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';

import { StateMapModel } from './map.state.model';
import { StateMapOptions } from './map.state.options';
import { ActionMapLocationWatch, ActionMapSearchResultSet, ActionMapSearchResultClear, ActionMapPlaceSet, ActionMapPlaceSetWithSearchResult, ActionMapPlaceClear } from './map.actions';

@State<StateMapModel>(StateMapOptions)

export class StateMap
{
    @Select(StateLocation.location) private location$: Observable<GeolocationPosition>;

    constructor() {}

    private static position(state: StateMapModel): GeolocationPosition { return state.position; }

    @Selector() static locationValid(state: StateMapModel): boolean { return StateMap.locationLiteral(state) != null; }

    @Selector() static locationLiteral(state: StateMapModel): LngLatLiteral
    {
        const position: GeolocationPosition = StateMap.position(state);
        const location: LngLatLiteral = position == null ? undefined :
        {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        return location;
    }

    @Selector() static locationLike(state: StateMapModel): LngLatLike
    {
        const position: GeolocationPosition = StateMap.position(state);

        const location: LngLatLike = position == null ? undefined :
        {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        return location;
    }
    @Selector() static searchResult(state: StateMapModel): Result { return state.searchResult; }

    @Selector() static searchResultCenter(state: StateMapModel): LngLatLike
    {
        const searchResult: Result = StateMap.searchResult(state);

        const center: LngLatLike = searchResult == null ? StateMap.locationLike(state) :
        {
            lat: searchResult.center[1],
            lng: searchResult.center[0]
        };

        return center;
    }

    @Selector() static searchResultDefined(state: StateMapModel): boolean
    {
        return StateMap.searchResult(state) == null ? false : true;
    }

    @Selector() static place(state: StateMapModel): Result { return state.place; }

    @Selector() static placeCenter(state: StateMapModel): LngLatLike
    {
        const result: Result = StateMap.place(state);

        const center: LngLatLike = result == null ? StateMap.locationLike(state) :
        {
            lat: result.center[1],
            lng: result.center[0]
        };

        return center;
    }

    @Selector() static placeDefined(state: StateMapModel): boolean
    {
        return StateMap.place(state) == null ? false : true;
    }

    @Selector() static placeOrSearch(state: StateMapModel): Result
    {
        const place: Result = StateMap.place(state);

        return place == null ? StateMap.searchResult(state) : place;
    }

    @Selector() static placeOrSearchCenter(state: StateMapModel): LngLatLike
    {
        const place: Result = StateMap.place(state);

        return place == null ? StateMap.searchResultCenter(state) : StateMap.placeCenter(state);
    }

    @Selector() static placeOrSearchDefined(state: StateMapModel): boolean
    {
        return StateMap.placeDefined(state) || StateMap.searchResultDefined(state);
    }

    public ngxsOnInit(context: StateContext<StateMapModel>): void
    {
        context.dispatch(new ActionMapLocationWatch());
    }

    @Action(ActionMapLocationWatch)
    locationWatch({ patchState })
    {
        return this.location$.pipe
        (
            tap((position: GeolocationPosition) => patchState({ position }))
        );
    }

    @Action(ActionMapSearchResultSet)
    searchResultSet({ patchState }, { payload }: ActionMapSearchResultSet)
    {
        patchState({ searchResult: payload });
    }

    @Action(ActionMapSearchResultClear)
    searchResultClear({ patchState })
    {
        patchState({ searchResult: StateMapOptions.defaults.searchResult });
    }

    @Action(ActionMapPlaceSet)
    placeSet({ patchState }, { payload }: ActionMapPlaceSet)
    {
        patchState({ place: payload });
    }

    @Action(ActionMapPlaceSetWithSearchResult)
    placeSetWithSearchResult({ getState, patchState })
    {
        patchState({ place: StateMap.searchResult(getState()) });
    }

    @Action(ActionMapPlaceClear)
    placeClear({ patchState })
    {
        patchState({ place: StateMapOptions.defaults.place });
    }
}
