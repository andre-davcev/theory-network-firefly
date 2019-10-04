import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateCluster } from '@firefly/core/state/cluster';
import { Event, ClusterEvent } from '@firefly/core/models';
import { ServiceClusterEvents, ServiceEvents } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

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
    ActionClusterEventsDelete
} from './cluster-events.actions';
import { ActionEventClustersRemove, ActionEventClustersAdd } from '../event-clusters/event-clusters.actions';

@State<StateClusterEventsModel>(StateClusterEventsOptions)

export class StateClusterEvents extends StateReferenceTable<ClusterEvent, Event, StateClusterEventsModel>
{
    @Selector() static data(state: StateClusterEventsModel):        Record<string, ClusterEvent> { return state.data; }
    @Selector() static keys(state: StateClusterEventsModel):        Array<string>                { return state.keys; }
    @Selector() static lookup(state: StateClusterEventsModel):      Record<string, Event>        { return state.lookup; }
    @Selector() static list(state: StateClusterEventsModel):        Array<Event>                 { return state.list; }
    @Selector() static offset(state: StateClusterEventsModel):      number                       { return state.offset; }
    @Selector() static pageSize(state: StateClusterEventsModel):    number                       { return state.pageSize; }
    @Selector() static sortField(state: StateClusterEventsModel):   SortField                    { return state.sortField; }
    @Selector() static initialized(state: StateClusterEventsModel): boolean                      { return state.initialized; }

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
        const id:          string  = this.store.selectSnapshot(StateCluster.id);
        const initialized: boolean = StateClusterEvents.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionClusterEventsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ClusterEvent>) =>
                dispatch([
                    new ActionClusterEventsSet(data),
                    new ActionClusterEventsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionClusterEventsGet() : of())
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

        return super.page
        (
            this.events,
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.pageSize(state),
            StateClusterEvents.offset(state)
        ).
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
    sortData({ getState, patchState }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSort)
    {
        const state:     StateClusterEventsModel      = getState();
        const data:      Record<string, ClusterEvent> = StateClusterEvents.data(state);
        const sortField: SortField                 = payload == null ? StateClusterEvents.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionClusterEventsAdd)
    add({ patchState, getState, dispatch}: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsAdd)
    {
        const state: StateClusterEventsModel = getState();
        const event: Event                   = payload;

        const clusterEvent: ClusterEvent =
        {
            sort: { name: event.name }
        };

        const partial: Partial<StateClusterEventsModel> =
        this.addData
        (
            event.id,
            event,
            clusterEvent,
            StateClusterEvents.data(state),
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.offset(state),
            StateClusterEvents.sortField(state)
        );

        patchState(partial);

        return dispatch(new ActionEventClustersAdd(this.store.selectSnapshot(StateCluster.data)));
    }

    @Action(ActionClusterEventsRemove)
    remove({ patchState, getState, dispatch }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsRemove)
    {
        const state: StateClusterEventsModel = getState();

        const partial: Partial<StateClusterEventsModel> =
        this.removeData
        (
            payload,
            StateClusterEvents.data(state),
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.offset(state)
        );

        patchState(partial);

        return dispatch(new ActionEventClustersRemove(this.store.selectSnapshot(StateCluster.id)));
    }

    @Action(ActionClusterEventsDelete)
    delete({ dispatch, getState }: StateContext<StateClusterEventsModel>)
    {
        return dispatch
        ([
            new ActionEventClustersRemove(this.store.selectSnapshot(StateCluster.id)),
            new ActionClusterEventsReset()
        ]);
    }
}
