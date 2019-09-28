import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateIcon } from '@firefly/core/state';
import { Cluster, IconCluster } from '@firefly/core/models';
import { ServiceIconClusters, ServiceClusters } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateIconClustersModel } from './icon-clusters.state.model';
import { StateIconClustersOptions } from './icon-clusters.state.options';
import {
    ActionIconClustersAdd,
    ActionIconClustersReset,
    ActionIconClustersRemove,
    ActionIconClustersGetData,
    ActionIconClustersSort,
    ActionIconClustersGet,
    ActionIconClustersSet,
    ActionIconClustersDelete
} from './icon-clusters.actions';

@State<StateIconClustersModel>(StateIconClustersOptions)

export class StateIconClusters extends StateReferenceTable<IconCluster, Cluster, StateIconClustersModel>
{
    @Selector() static data(state: StateIconClustersModel):      Record<string, IconCluster> { return state.data; }
    @Selector() static keys(state: StateIconClustersModel):      Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateIconClustersModel):    Record<string, Cluster>     { return state.lookup; }
    @Selector() static list(state: StateIconClustersModel):      Array<Cluster>              { return state.list; }
    @Selector() static offset(state: StateIconClustersModel):    number                      { return state.offset; }
    @Selector() static pageSize(state: StateIconClustersModel):  number                      { return state.pageSize; }
    @Selector() static sortField(state: StateIconClustersModel): SortField                   { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceIconClusters,
        private clusters: ServiceClusters
    )
    {
        super();
    }

    @Action(ActionIconClustersReset)
    reset({ patchState }: StateContext<StateIconClustersModel>)
    {
        const defaults: StateIconClustersModel = CoreUtil.clone<StateIconClustersModel>(StateIconClustersOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionIconClustersGetData)
    getData({ dispatch }: StateContext<StateIconClustersModel>)
    {
        const userId: string = this.store.selectSnapshot(StateIcon.id);

        return dispatch(new ActionIconClustersReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, IconCluster>) =>
                dispatch([
                    new ActionIconClustersSet(data),
                    new ActionIconClustersSort()
                ])
            )
        );
    }

    @Action(ActionIconClustersGet)
    get({ getState, patchState }: StateContext<StateIconClustersModel>)
    {
        const state: StateIconClustersModel = getState();

        return super.page
        (
            this.clusters,
            StateIconClusters.keys(state),
            StateIconClusters.lookup(state),
            StateIconClusters.list(state),
            StateIconClusters.pageSize(state),
            StateIconClusters.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateIconClustersModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionIconClustersSet)
    set({ patchState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionIconClustersSort)
    sortData({ getState, patchState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersSort)
    {
        const state:     StateIconClustersModel      = getState();
        const data:      Record<string, IconCluster> = StateIconClusters.data(state);
        const sortField: SortField                 = payload == null ? StateIconClusters.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionIconClustersAdd)
    add({ patchState, getState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersAdd)
    {
        const state: StateIconClustersModel = getState();
        const cluster: Cluster              = payload;

        const iconCluster: IconCluster =
        {
            sort: { name: cluster.name }
        };

        const partial: Partial<StateIconClustersModel> =
        this.addData
        (
            cluster.id,
            cluster,
            iconCluster,
            StateIconClusters.data(state),
            StateIconClusters.keys(state),
            StateIconClusters.lookup(state),
            StateIconClusters.list(state),
            StateIconClusters.offset(state),
            StateIconClusters.sortField(state)
        );

        patchState(partial);
    }

    @Action(ActionIconClustersRemove)
    remove({ patchState, getState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersRemove)
    {
        const state: StateIconClustersModel = getState();

        const partial: Partial<StateIconClustersModel> =
        this.removeData
        (
            payload,
            StateIconClusters.data(state),
            StateIconClusters.keys(state),
            StateIconClusters.lookup(state),
            StateIconClusters.list(state),
            StateIconClusters.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionIconClustersDelete)
    delete({ dispatch }: StateContext<StateIconClustersModel>)
    {
        return dispatch
        ([
            new ActionIconClustersReset()
        ]);
    }
}
