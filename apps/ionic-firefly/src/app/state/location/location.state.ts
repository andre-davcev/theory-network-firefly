
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { GeolocationPosition } from '@capacitor/core';

import { Geolocation } from '@theory/capacitor';

import { LocationWatch } from './location.actions';

export interface StateLocationModel
{
    location : GeolocationPosition;
    error    : Error;
}

export const StateLocationOptions: StoreOptions<StateLocationModel> =
{
    name : 'location',

    defaults :
    {
        location  : undefined,
        error     : undefined
    }
};

@State<StateLocationModel>(StateLocationOptions)

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

        watchPosition({ enableHighAccuracy: false },

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
