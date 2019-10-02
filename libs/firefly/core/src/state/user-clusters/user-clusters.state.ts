import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Cluster, UserCluster } from '@firefly/core/models';
import { ServiceUserClusters, ServiceClusters } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserClustersModel } from './user-clusters.state.model';
import { StateUserClustersOptions } from './user-clusters.state.options';
import {
    ActionUserClustersAdd,
    ActionUserClustersReset,
    ActionUserClustersRemove,
    ActionUserClustersGetData,
    ActionUserClustersSort,
    ActionUserClustersGet,
    ActionUserClustersSet,
    ActionUserClustersDelete
} from './user-clusters.actions';
import { of } from 'rxjs';

@State<StateUserClustersModel>(StateUserClustersOptions)

export class StateUserClusters extends StateReferenceTable<UserCluster, Cluster, StateUserClustersModel>
{
    @Selector() static data(state: StateUserClustersModel):        Record<string, UserCluster> { return state.data; }
    @Selector() static keys(state: StateUserClustersModel):        Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateUserClustersModel):      Record<string, Cluster>     { return state.lookup; }
    @Selector() static list(state: StateUserClustersModel):        Array<Cluster>              { return state.list; }
    @Selector() static offset(state: StateUserClustersModel):      number                      { return state.offset; }
    @Selector() static pageSize(state: StateUserClustersModel):    number                      { return state.pageSize; }
    @Selector() static sortField(state: StateUserClustersModel):   SortField                   { return state.sortField; }
    @Selector() static initialized(state: StateUserClustersModel): boolean                     { return state.initialized; }

    constructor
    (
        private store: Store,
        private service: ServiceUserClusters,
        private clusters: ServiceClusters
    )
    {
        super();
    }

    @Action(ActionUserClustersReset)
    reset({ patchState }: StateContext<StateUserClustersModel>)
    {
        const defaults: StateUserClustersModel = CoreUtil.clone<StateUserClustersModel>(StateUserClustersOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserClustersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserClustersModel>, { fetch }: ActionUserClustersGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserClusters.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserCluster>) =>
                dispatch([
                    new ActionUserClustersSet(data),
                    new ActionUserClustersSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserClustersGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserClustersGet)
    get({ getState, patchState }: StateContext<StateUserClustersModel>)
    {
        const state: StateUserClustersModel = getState();

        return super.page
        (
            this.clusters,
            StateUserClusters.keys(state),
            StateUserClusters.lookup(state),
            StateUserClusters.list(state),
            StateUserClusters.pageSize(state),
            StateUserClusters.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateUserClustersModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionUserClustersSet)
    set({ patchState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserClustersSort)
    sortData({ getState, patchState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersSort)
    {
        const state:     StateUserClustersModel      = getState();
        const data:      Record<string, UserCluster> = StateUserClusters.data(state);
        const sortField: SortField                 = payload == null ? StateUserClusters.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserClustersAdd)
    add({ patchState, getState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersAdd)
    {
        const state: StateUserClustersModel = getState();
        const cluster: Cluster              = payload;

        const userCluster: UserCluster =
        {
            sort: { name: cluster.name }
        };

        const partial: Partial<StateUserClustersModel> =
        this.addData
        (
            cluster.id,
            cluster,
            userCluster,
            StateUserClusters.data(state),
            StateUserClusters.keys(state),
            StateUserClusters.lookup(state),
            StateUserClusters.list(state),
            StateUserClusters.offset(state),
            StateUserClusters.sortField(state)
        );

        patchState(partial);
    }

    @Action(ActionUserClustersRemove)
    remove({ patchState, getState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersRemove)
    {
        const state: StateUserClustersModel = getState();

        const partial: Partial<StateUserClustersModel> =
        this.removeData
        (
            payload,
            StateUserClusters.data(state),
            StateUserClusters.keys(state),
            StateUserClusters.lookup(state),
            StateUserClusters.list(state),
            StateUserClusters.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionUserClustersDelete)
    delete({ dispatch }: StateContext<StateUserClustersModel>)
    {
        return dispatch
        ([
            new ActionUserClustersReset()
        ]);
    }
}
