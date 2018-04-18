
import {State, Selector, Action, StateContext} from '@ngxs/store';

import {Observable} from 'rxjs/Observable';
import {filter, map, catchError} from 'rxjs/operators';

import {Geolocation, Geoposition} from '@ionic-native/geolocation';

import { of } from 'rxjs/observable/of';

// Actions
export class LocationGet {}

export interface StateLocationModel
{
    location  : Partial<Geoposition>;
    permitted : boolean;
    error     : Error;
}

@State<StateLocationModel>
({
    name : 'location',

    defaults :
    {
        location  : undefined,
        permitted : false,
        error     : undefined
    }
})

export class StateLocation
{
    constructor(private geolocation: Geolocation) {}

    @Selector() static location(state: StateLocationModel)  {return state.location;}
    @Selector() static permitted(state: StateLocationModel) {return state.permitted;}
    @Selector() static error(state: StateLocationModel)     {return state.error;}

    @Selector() static errored(state: StateLocationModel) {return state.error != null;}

    @Action(LocationGet)
    locationGet({ getState, setState }: StateContext<StateLocationModel>)
    {
        return this.geolocation.watchPosition().pipe
        (
            filter((position) => position.coords !== undefined),

            map((position: Geoposition) =>
            {
                setState
                ({
                    ...getState(),
                    location: position,
                    permitted: true
                });
            }),

            catchError((error: Error) => of(setState({...getState(), error: error})))
        );
    }
}