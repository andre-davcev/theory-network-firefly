import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateEvent } from '@firefly/core/state';
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
    ActionEventClustersSet
} from './event-clusters.actions';

@State<StateEventClustersModel>(StateEventClustersOptions)

export class StateEventClusters extends StateReferenceTable<EventCluster, Cluster, StateEventClustersModel>
{
    @Selector() static data(state: StateEventClustersModel):      Record<string, EventCluster> { return state.data; }
    @Selector() static keys(state: StateEventClustersModel):      Array<string>                { return state.keys; }
    @Selector() static lookup(state: StateEventClustersModel):    Record<string, Cluster>      { return state.lookup; }
    @Selector() static list(state: StateEventClustersModel):      Array<Cluster>               { return state.list; }
    @Selector() static offset(state: StateEventClustersModel):    number                       { return state.offset; }
    @Selector() static pageSize(state: StateEventClustersModel):  number                       { return state.pageSize; }
    @Selector() static sortField(state: StateEventClustersModel): SortField                    { return state.sortField; }

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
    reset({ patchState }: StateContext<StateEventClustersModel>)
    {
        const defaults: StateEventClustersModel = CoreUtil.clone<StateEventClustersModel>(StateEventClustersOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionEventClustersGetData)
    getData({ dispatch }: StateContext<StateEventClustersModel>)
    {
        const userId: string = this.store.selectSnapshot(StateEvent.id);

        return dispatch(new ActionEventClustersReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, EventCluster>) =>
                dispatch([
                    new ActionEventClustersSet(data),
                    new ActionEventClustersSort()
                ])
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
    sortData({ getState, patchState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersSort)
    {
        const state:     StateEventClustersModel      = getState();
        const data:      Record<string, EventCluster> = StateEventClusters.data(state);
        const sortField: SortField                    = payload == null ? StateEventClusters.sortField(state) : payload;
        const keys:      Array<string>                = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionEventClustersAdd)
    add({ patchState, getState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersAdd)
    {
        const state: StateEventClustersModel = getState();
        const cluster: Cluster               = payload;

        const eventCluster: EventCluster =
        {
            sort: { name: cluster.name }
        };

        const partial: Partial<StateEventClustersModel> =
        this.addData
        (
            cluster.id,
            cluster,
            eventCluster,
            StateEventClusters.data(state),
            StateEventClusters.keys(state),
            StateEventClusters.lookup(state),
            StateEventClusters.list(state),
            StateEventClusters.offset(state),
            StateEventClusters.sortField(state)
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
}
