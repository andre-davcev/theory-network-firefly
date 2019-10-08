import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
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
    ActionClusterEventsDelete,
    ActionClusterEventsSync
} from './cluster-events.actions';
import { ActionEventClustersRemove, ActionEventClustersAdd } from '../event-clusters/event-clusters.actions';

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
    @Selector() static sort(state: StateClusterEventsModel):          string                       { return state.sort; }
    @Selector() static sortAscending(state: StateClusterEventsModel): boolean                      { return state.sortAscending; }
    @Selector() static sortFields(state: StateClusterEventsModel):    Record<string, TypeOf>       { return state.sortFields; }

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
    sortData({ getState, patchState }: StateContext<StateClusterEventsModel>)
    {
        const state: StateClusterEventsModel      = getState();
        const data:  Record<string, ClusterEvent> = StateClusterEvents.data(state);

        const sortField:     string  = StateClusterEvents.sort(state);
        const sortAscending: boolean = StateClusterEvents.sortAscending(state);
        const sortType:      TypeOf  = StateClusterEvents.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionClusterEventsAdd)
    add({ patchState, getState, dispatch }: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsAdd)
    {
        const state:  StateClusterEventsModel = getState();
        const entity: Event                   = payload;

        const sortFields:    Record<string, TypeOf> = StateClusterEvents.sortFields(state);
        const sortField:     string                 = StateClusterEvents.sort(state);
        const sortAscending: boolean                = StateClusterEvents.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: ClusterEvent =
        {
            sort: this.sortFields(sortFields,  entity)
        };

        const partial: Partial<StateClusterEventsModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateClusterEvents.data(state),
            StateClusterEvents.keys(state),
            StateClusterEvents.lookup(state),
            StateClusterEvents.list(state),
            StateClusterEvents.offset(state),
            sortField,
            sortAscending,
            sortType
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

    @Action(ActionClusterEventsSync)
    sync({ patchState, getState}: StateContext<StateClusterEventsModel>, { payload }: ActionClusterEventsSync)
    {
        const state:  StateClusterEventsModel = getState();
        const object: Event                   = payload;
        const id:     string                  = object.id;
        const list:   Array<Event>            = StateClusterEvents.list(state);
        const lookup: Record<string, Event>   = StateClusterEvents.lookup(state);

        const index: number = list.findIndex((item: Event) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
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
