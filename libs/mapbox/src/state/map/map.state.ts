
import { State, Selector, Action, StateContext, Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { StateLocation } from '@theory/capacitor';
import { LngLatLike } from 'mapbox-gl';
import { LngLatLiteral } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { tap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';

import { StateMapModel } from './map.state.model';
import { StateMapOptions } from './map.state.options';
import { ActionMapLocationWatch } from './map.actions';

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
}
