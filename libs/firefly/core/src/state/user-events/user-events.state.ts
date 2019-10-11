import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Event, UserEvent } from '@firefly/core/models';
import { ServiceUserEvents, ServiceEvents } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

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

@State<StateUserEventsModel>(StateUserEventsOptions)

export class StateUserEvents extends StateReferenceTable<UserEvent, Event, StateUserEventsModel>
{
    @Selector() static data(state: StateUserEventsModel):          Record<string, UserEvent> { return state.data; }
    @Selector() static keys(state: StateUserEventsModel):          Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserEventsModel):        Record<string, Event>     { return state.lookup; }
    @Selector() static list(state: StateUserEventsModel):          Array<Event>              { return state.list; }
    @Selector() static offset(state: StateUserEventsModel):        number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserEventsModel):      number                    { return state.pageSize; }
    @Selector() static initialized(state: StateUserEventsModel):   boolean                   { return state.initialized; }
    @Selector() static sortField(state: StateUserEventsModel):     string                    { return state.sortField; }
    @Selector() static sortAscending(state: StateUserEventsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserEventsModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserEventsModel):      TypeOf                    { return state.sortFields[state.sortField]; }
    @Selector() static sortByEntity(state: StateUserEventsModel):  boolean                   { return state.sortByEntity; }
    @Selector() static sort(state: StateUserEventsModel):          boolean                   { return Object.keys(StateUserEvents.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserEventsModel):         number                    { return Object.keys(StateUserEvents.data(state)).length; }

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
    reset({ patchState, getState }: StateContext<StateUserEventsModel>)
    {
        const defaults: StateUserEventsModel = CoreUtil.clone<StateUserEventsModel>(StateUserEventsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserEventsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserEventsModel>, { fetch }: ActionUserEventsGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserEvents.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserEventsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserEvent>) =>
                dispatch([
                    new ActionUserEventsSet(data),
                    new ActionUserEventsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserEventsGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserEventsGet)
    get({ getState, patchState }: StateContext<StateUserEventsModel>)
    {
        return super.page
        (
            getState(),
            this.events
        ).
        pipe
        (
            tap((partial: Partial<StateUserEventsModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionUserEventsSet)
    set({ patchState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserEventsSort)
    sortData({ getState, patchState }: StateContext<StateUserEventsModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
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

    @Action(ActionUserEventsDelete)
    delete({ dispatch }: StateContext<StateUserEventsModel>)
    {
        return dispatch
        ([
            new ActionUserEventsReset()
        ]);
    }
}
