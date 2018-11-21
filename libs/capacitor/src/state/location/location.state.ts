
import { State, Selector, Action, StateContext } from '@ngxs/store';

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

    ngxsOnInit(context: StateContext<StateLocationModel>)
    {
        //context.dispatch(new ActionLocationWatch());
    }

    @Action(ActionLocationWatch)
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
