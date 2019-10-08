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
    @Selector() static sortField(state: StateUserEventsModel):     string                    { return state.sort; }
    @Selector() static sortAscending(state: StateUserEventsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserEventsModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserEventsModel):      TypeOf                    { return state.sortFields[state.sort]; }

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
        const state: StateUserEventsModel = getState();

        return super.page
        (
            this.events,
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.pageSize(state),
            StateUserEvents.offset(state)
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
        const state: StateUserEventsModel      = getState();
        const data:  Record<string, UserEvent> = StateUserEvents.data(state);

        const sortField:     string  = StateUserEvents.sortField(state);
        const sortAscending: boolean = StateUserEvents.sortAscending(state);
        const sortType:      TypeOf  = StateUserEvents.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionUserEventsAdd)
    add({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsAdd)
    {
        const state:  StateUserEventsModel = getState();
        const entity: Event                = payload;

        const sortFields:    Record<string, TypeOf> = StateUserEvents.sortFields(state);
        const sortField:     string                 = StateUserEvents.sortField(state);
        const sortAscending: boolean                = StateUserEvents.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: UserEvent =
        {
            sort: this.sortFields(sortFields, entity)
        };

        const partial: Partial<StateUserEventsModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateUserEvents.data(state),
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.offset(state),
            sortField,
            sortAscending,
            sortType
        );

        patchState(partial);
    }

    @Action(ActionUserEventsRemove)
    remove({ patchState, getState }: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsRemove)
    {
        const state: StateUserEventsModel = getState();

        const partial: Partial<StateUserEventsModel> =
        this.removeData
        (
            payload,
            StateUserEvents.data(state),
            StateUserEvents.keys(state),
            StateUserEvents.lookup(state),
            StateUserEvents.list(state),
            StateUserEvents.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionUserEventsSync)
    sync({ patchState, getState}: StateContext<StateUserEventsModel>, { payload }: ActionUserEventsSync)
    {
        const state:  StateUserEventsModel  = getState();
        const lookup: Record<string, Event> = StateUserEvents.lookup(state);
        const after:  Event                 = payload;
        const before: Event                 = lookup[after.id];

        const partial: Partial<StateUserEventsModel> = this.syncData
        (
            before,
            after,
            StateUserEvents.list(state),
            lookup,
            StateUserEvents.data(state),
            StateUserEvents.sortField(state),
            StateUserEvents.sortAscending(state),
            StateUserEvents.sortType(state)
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
