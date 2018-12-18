
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { GeolocationPosition } from '@capacitor/core';
import { tap, catchError } from 'rxjs/operators';

import { Geolocation } from '../../constants';

import { StateLocationModel } from './location.state.model';
import { StateLocationOptions } from './location.state.options';
import { ActionLocationWatch } from './location.actions';

@State<StateLocationModel>(StateLocationOptions)

export class StateLocation
{
    constructor() {}

    @Selector() static location(state: StateLocationModel)  {return state.location;}
    @Selector() static error(state: StateLocationModel)     {return state.error;}

    @Selector() static loading(state: StateLocationModel) {return state.location == null;}
    @Selector() static errored(state: StateLocationModel) {return state.error != null;}
    @Selector() static locationValid(state: StateLocationModel)  {return state.location != null && state.location.coords != null;}

    ngxsOnInit(context: StateContext<StateLocationModel>)
    {
        context.dispatch(new ActionLocationWatch());
    }

    @Action(ActionLocationWatch)
    locationWatch({ patchState }: StateContext<StateLocationModel>)
    {
        return from(Geolocation.getCurrentPosition()).
        pipe
        (
            tap((location: GeolocationPosition) =>
            {
                console.log('found location');
                console.log(location);
                patchState({ location });
            }),
            catchError((error: any) =>
            {
                console.log('error finding location');
                console.log(error);
                return of(error);
            })
        );
    }
}
