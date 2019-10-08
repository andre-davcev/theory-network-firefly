import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { ActionClusterEventsRemove } from '../cluster-events';
import { Cluster, EventCluster } from '@firefly/core/models';
import { ServiceEventClusters, ServiceClusters } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateEventClustersModel } from './event-clusters.state.model';
import { StateEventClustersOptions } from './event-clusters.state.options';
import {
    ActionEventClustersAdd,
    ActionEventClustersReset,
    ActionEventClustersRemove,
    ActionEventClustersGetData,
    ActionEventClustersSort,
    ActionEventClustersGet,
    ActionEventClustersSet,
    ActionEventClustersDelete,
    ActionEventClustersSync
} from './event-clusters.actions';
import { StateCluster } from '../cluster';

@State<StateEventClustersModel>(StateEventClustersOptions)

export class StateEventClusters extends StateReferenceTable<EventCluster, Cluster, StateEventClustersModel>
{
    @Selector() static data(state: StateEventClustersModel):          Record<string, EventCluster> { return state.data; }
    @Selector() static keys(state: StateEventClustersModel):          Array<string>                { return state.keys; }
    @Selector() static lookup(state: StateEventClustersModel):        Record<string, Cluster>      { return state.lookup; }
    @Selector() static list(state: StateEventClustersModel):          Array<Cluster>               { return state.list; }
    @Selector() static offset(state: StateEventClustersModel):        number                       { return state.offset; }
    @Selector() static pageSize(state: StateEventClustersModel):      number                       { return state.pageSize; }
    @Selector() static initialized(state: StateEventClustersModel):   boolean                      { return state.initialized; }
    @Selector() static sort(state: StateEventClustersModel):          string                       { return state.sort; }
    @Selector() static sortAscending(state: StateEventClustersModel): boolean                      { return state.sortAscending; }
    @Selector() static sortFields(state: StateEventClustersModel):    Record<string, TypeOf>       { return state.sortFields; }

    constructor
    (
        private store: Store,
        private service: ServiceEventClusters,
        private clusters: ServiceClusters
    )
    {
        super();
    }

    @Action(ActionEventClustersReset)
    reset({ patchState, getState }: StateContext<StateEventClustersModel>)
    {
        const defaults: StateEventClustersModel = CoreUtil.clone<StateEventClustersModel>(StateEventClustersOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionEventClustersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateEventClustersModel>, { fetch }: ActionEventClustersGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateCluster.id);
        const initialized: boolean = StateEventClusters.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionEventClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, EventCluster>) =>
                dispatch([
                    new ActionEventClustersSet(data),
                    new ActionEventClustersSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionEventClustersGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionEventClustersGet)
    get({ getState, patchState }: StateContext<StateEventClustersModel>)
    {
        const state: StateEventClustersModel = getState();

        return super.page
        (
            this.clusters,
            StateEventClusters.keys(state),
            StateEventClusters.lookup(state),
            StateEventClusters.list(state),
            StateEventClusters.pageSize(state),
            StateEventClusters.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateEventClustersModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionEventClustersSet)
    set({ patchState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionEventClustersSort)
    sortData({ getState, patchState }: StateContext<StateEventClustersModel>)
    {
        const state: StateEventClustersModel      = getState();
        const data:  Record<string, EventCluster> = StateEventClusters.data(state);

        const sortField:     string  = StateEventClusters.sort(state);
        const sortAscending: boolean = StateEventClusters.sortAscending(state);
        const sortType:      TypeOf  = StateEventClusters.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionEventClustersAdd)
    add({ patchState, getState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersAdd)
    {
        const state:  StateEventClustersModel = getState();
        const entity: Cluster                 = payload;

        const sortFields:    Record<string, TypeOf> = StateEventClusters.sortFields(state);
        const sortField:     string                 = StateEventClusters.sort(state);
        const sortAscending: boolean                = StateEventClusters.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: EventCluster =
        {
            sort: this.sortFields(sortFields, entity)
        };

        const partial: Partial<StateEventClustersModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateEventClusters.data(state),
            StateEventClusters.keys(state),
            StateEventClusters.lookup(state),
            StateEventClusters.list(state),
            StateEventClusters.offset(state),
            sortField,
            sortAscending,
            sortType
        );

        patchState(partial);
    }

    @Action(ActionEventClustersRemove)
    remove({ patchState, getState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersRemove)
    {
        const state: StateEventClustersModel = getState();

        const partial: Partial<StateEventClustersModel> =
        this.removeData
        (
            payload,
            StateEventClusters.data(state),
            StateEventClusters.keys(state),
            StateEventClusters.lookup(state),
            StateEventClusters.list(state),
            StateEventClusters.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionEventClustersSync)
    sync({ patchState, getState}: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersSync)
    {
        const state:  StateEventClustersModel = getState();
        const object: Cluster                 = payload;
        const id:     string                  = object.id;
        const list:   Array<Cluster>          = StateEventClusters.list(state);
        const lookup: Record<string, Cluster> = StateEventClusters.lookup(state);

        const index: number = list.findIndex((item: Cluster) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
    }

    @Action(ActionEventClustersDelete)
    delete({ dispatch }: StateContext<StateEventClustersModel>)
    {
        return dispatch
        ([
            new ActionClusterEventsRemove(this.store.selectSnapshot(StateCluster.id)),
            new ActionEventClustersReset()
        ]);
    }
}
