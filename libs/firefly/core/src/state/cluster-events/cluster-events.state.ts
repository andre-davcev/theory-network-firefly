import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { StateCluster } from '@firefly/core/state/cluster';
import { Event, ClusterEvent } from '@firefly/core/models';
import { ServiceClusterEvents, ServiceEvents } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/ngxs';

import { StateClusterEventsModel } from './cluster-events.state.model';
import { StateClusterEventsOptions } from './cluster-events.state.options';
import {
    ActionClusterEventsAdd,
    ActionClusterEventsReset,
    ActionClusterEventsRemove,
    ActionClusterEventsGetData,
    ActionClusterEventsSort,
    ActionClusterEventsGet,
    ActionClusterEventsSet,
    ActionClusterEventsDelete,
    ActionClusterEventsSync
} from './cluster-events.actions';

@State<StateClusterEventsModel>(StateClusterEventsOptions)

export class StateClusterEvents extends StateReferenceTable<ClusterEvent, Event, StateClusterEventsModel>
{
    @Selector() static data(state: StateClusterEventsModel):          Record<string, ClusterEvent> { return state.data; }
    @Selector() static keys(state: StateClusterEventsModel):          Array<string>                { return state.keys; }
    @Selector() static lookup(state: StateClusterEventsModel):        Record<string, Event>        { return state.lookup; }
    @Selector() static list(state: StateClusterEventsModel):          Array<Event>                 { return state.list; }
    @Selector() static offset(state: StateClusterEventsModel):        number                       { return state.offset; }
    @Selector() static pageSize(state: StateClusterEventsModel):      number                       { return state.pageSize; }
    @Selector() static initialized(state: StateClusterEventsModel):   boolean                      { return state.initialized; }
    @Selector() static sortField(state: StateClusterEventsModel):     string                       { return state.sortField; }
    @Selector() static sortAscending(state: StateClusterEventsModel): boolean                      { return state.sortAscending; }
    @Selector() static sortFields(state: StateClusterEventsModel):    Record<string, TypeOf>       { return state.sortFields; }
    @Selector() static sortType(state: StateClusterEventsModel):      TypeOf                       { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateClusterEventsModel):          boolean                      { return Object.keys(StateClusterEvents.sortFields(state)).length > 0; }
    @Selector() static count(state: StateClusterEventsModel):         number                       { return Object.keys(StateClusterEvents.data(state)).length; }
    @Selector() static getAll(state: StateClusterEventsModel):        boolean                      { return StateClusterEvents.sort(state) && state.sortByEntity; }

    constructor
    (
        private store: Store,
        private service: ServiceClusterEvents,
        private events: ServiceEvents
    )
    {
        super();
    }

    @Action(ActionClusterEventsReset)
    reset({ patchState }: StateContext<StateClusterEventsModel>)
    {
        const defaults: StateClusterEventsModel = CoreUtil.clone<StateClusterEventsModel>(StateClusterEventsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionClusterEventsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateClusterEventsModel>, { fetch }: ActionClusterEventsGetData)
    {
        const state: StateClusterEventsModel = getState();

        const id:          string  = this.store.selectSnapshot(StateCluster.id);
        const initialized: boolean = StateClusterEvents.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionClusterEventsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ClusterEvent>) =>
                dispatch(new ActionClusterEventsSet(data))
            ),
            switchMap(() =>
                StateClusterEvents.getAll(state) ? of(null) : dispatch(new ActionClusterEventsSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionClusterEventsGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionClusterEventsGet)
    get({ getState, patchState }: StateContext<StateClusterEventsModel>)
    {
        const state: StateClusterEventsModel = getState();

        return this.page(state, this.events).
        pipe
        (
            tap((partial: Partial<StateClusterEventsModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionClusterEventsSet)
    set({ patchState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionClusterEventsSort)
    sortData({ getState, patchState }: StateContext<StateClusterEventsModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionClusterEventsAdd)
    add({ patchState, getState, dispatch }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsAdd)
    {
        const state:  StateClusterEventsModel = getState();
        const entity: Event                   = payload;

        const partial: Partial<StateClusterEventsModel> =
        this.addData
        (
            state,
            entity
        );

        patchState(partial);
    }

    @Action(ActionClusterEventsRemove)
    remove({ patchState, getState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsRemove)
    {
        const state: StateClusterEventsModel = getState();

        const partial: Partial<StateClusterEventsModel> =
        this.removeData
        (
            state,
            payload
        );

        patchState(partial);
    }

    @Action(ActionClusterEventsSync)
    sync({ patchState, getState}: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSync)
    {
        const after: Event = payload;

        const partial: Partial<StateClusterEventsModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionClusterEventsDelete)
    delete({ dispatch }: StateContext<StateClusterEventsModel>)
    {
        return dispatch
        ([
            new ActionClusterEventsReset()
        ]);
    }
}
