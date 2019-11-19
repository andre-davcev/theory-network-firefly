import { State, Selector, Action, StateContext, Store, NgxsOnInit } from '@ngxs/store';
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
import { Query } from '@angular/fire/firestore';

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents extends StateQuery<Event, ServiceEvents, StateUserEventsModel> implements NgxsOnInit
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
        private service: ServiceEvents
    )
    {
        super();
    }

    public ngxsOnInit(context: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query:  Query  = this.service.collection.ref.where('userId', '==', userId);

        super.init
        (
            context,
            query,
            this.service
        );
    }

    @Action(ActionUserEventsGetData)
    getData(context: StateContext<StateUserEventsModel>)
    {
        return super.query(context, StateUserEventsOptions.defaults);
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
