
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Injectable } from '@angular/core';
import { LngLatLike } from 'mapbox-gl';

import { StateLocationModel } from './location.state.model';
import { StateLocationOptions } from './location.state.options';
import { ActionLocationWatch } from './location.actions';

@State<StateLocationModel>(StateLocationOptions)
@Injectable()
export class StateLocation
{
    @Selector() static location(state: StateLocationModel) : Position { return state.location; }
    @Selector() static error(state: StateLocationModel)    : Error               { return state.error; }
    @Selector() static loading(state: StateLocationModel)  : boolean             { return state.location == null; }
    @Selector() static errored(state: StateLocationModel)  : boolean             { return state.error != null; }
    @Selector() static isValid(state: StateLocationModel)  : boolean             { return state.location != null && state.location.coords != null; }

    @Selector()
    static locationLike(state: StateLocationModel): LngLatLike
    {
        return !StateLocation.isValid(state) ?
            null :
            [
                StateLocation.location(state).coords.longitude,
                StateLocation.location(state).coords.latitude
            ];
    }

    ngxsOnInit(context: StateContext<StateLocationModel>)
    {
        context.dispatch(new ActionLocationWatch());
    }

    @Action(ActionLocationWatch, { cancelUncompleted: true })
    locationWatch({ patchState }: StateContext<StateLocationModel>)
    {
        return from(Geolocation.getCurrentPosition()).
        pipe
        (
            tap((location: GeolocationPosition) =>
                patchState({ location })
            ),
            catchError((error: any) =>
                of(error)
            )
        );
    }
}
