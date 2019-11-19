import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Event, UserEvent } from '@firefly/core/models';
import { ServiceUserEvents, ServiceEvents } from '@firefly/core/services';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsReset,
    ActionUserEventsRemove,
    ActionUserEventsGetData,
    ActionUserEventsSort,
    ActionUserEventsGet,
    ActionUserEventsSet,
    ActionUserEventsDelete,
    ActionUserEventsSync
} from './user-events.actions';
import { StateUser } from '../user';
import { StateQuery } from '@theory/ngxs';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents extends StateQuery<Event, ServiceEvents, StateUserEventsModel>
{
    @Selector() static data(state: StateUserEventsModel):          Record<string, UserEvent> { return state.data; }
    @Selector() static keys(state: StateUserEventsModel):          Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserEventsModel):        Record<string, Event>     { return state.lookup; }
    @Selector() static list(state: StateUserEventsModel):          Array<Event>              { return state.list; }
    @Selector() static pageSize(state: StateUserEventsModel):      number                    { return state.pageSize; }
    @Selector() static initialized(state: StateUserEventsModel):   boolean                   { return state.initialized; }
    @Selector() static sortField(state: StateUserEventsModel):     string                    { return state.sortField; }
    @Selector() static sortAscending(state: StateUserEventsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserEventsModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserEventsModel):      TypeOf                    { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserEventsModel):          boolean                   { return Object.keys(StateUserEvents.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserEventsModel):         number                    { return Object.keys(StateUserEvents.data(state)).length; }
    @Selector() static found(state: StateUserEventsModel):         boolean                   { return StateUserEvents.count(state) > 0; }
    @Selector() static getAll(state: StateUserEventsModel):        boolean                   { return StateUserEvents.sort(state) && state.sortByEntity; }

    constructor
    (
        private store:   Store,
        private service: ServiceUserEvents,
        private events:  ServiceEvents
    )
    {
        super();
    }

    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        super.reset(context, StateUserEventsOptions.defaults, this.events);

        context.patchState({})
    }

    @Action(ActionUserEventsGetData)
    getData(context: StateContext<StateUserEventsModel>, { fetch }: ActionUserEventsGetData)
    {
        return super.query(context, StateUserEventsOptions.defaults, this.events);
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserEventsAdd)
    add({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsAdd)
    {
        const entity: Event = payload;

        const partial: Partial<StateUserEventsModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionUserEventsRemove)
    remove({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsRemove)
    {
        const partial: Partial<StateUserEventsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserEventsSync)
    sync({ patchState, getState}: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSync)
    {
        const after: Event = payload;

        const partial: Partial<StateUserEventsModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }
}
