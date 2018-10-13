
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GeolocationPosition } from '@capacitor/core';

import { LocationWatch } from './location.actions';

export interface StateLocationModel
{
    location  : GeolocationPosition;
    error     : Error;
}

@State<StateLocationModel>
({
    name : 'location',

    defaults :
    {
        location  : undefined,
        error     : undefined
    }
})

export class StateLocation
{
    constructor() {}

    @Selector() static location(state: StateLocationModel)  {return state.location;}
    @Selector() static error(state: StateLocationModel)     {return state.error;}

    @Selector() static loading(state: StateLocationModel) {return state.location == null;}
    @Selector() static errored(state: StateLocationModel) {return state.error != null;}

    ngxsOnInit(context: StateContext<StateLocationModel>)
    {
        context.dispatch(new LocationWatch());
    }

    @Action(LocationWatch)
    locationWatch({ patchState }: StateContext<StateLocationModel>)
    {
        return Geolocation.

        watchPosition({enableHighAccuracy: true},

        (location, error) =>
        {
            if (error != null)
            {
                console.log(location);
                patchState({error});
            }
            else
            {
                console.log(location);
                patchState({location});
            }
        });
    }
}
