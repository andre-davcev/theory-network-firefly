import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Cluster, UserCluster } from '@firefly/core/models';
import { ServiceUserClusters, ServiceClusters } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

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
    ActionUserClustersDelete,
    ActionUserClustersSync
} from './user-clusters.actions';
import { StateUser } from '../user/user.state';

@State<StateUserClustersModel>(StateUserClustersOptions)

export class StateUserClusters extends StateReferenceTable<UserCluster, Cluster, StateUserClustersModel>
{
    @Selector() static data(state: StateUserClustersModel):          Record<string, UserCluster> { return state.data; }
    @Selector() static keys(state: StateUserClustersModel):          Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateUserClustersModel):        Record<string, Cluster>     { return state.lookup; }
    @Selector() static list(state: StateUserClustersModel):          Array<Cluster>              { return state.list; }
    @Selector() static offset(state: StateUserClustersModel):        number                      { return state.offset; }
    @Selector() static pageSize(state: StateUserClustersModel):      number                      { return state.pageSize; }
    @Selector() static initialized(state: StateUserClustersModel):   boolean                     { return state.initialized; }
    @Selector() static sortField(state: StateUserClustersModel):     string                      { return state.sortField; }
    @Selector() static sortAscending(state: StateUserClustersModel): boolean                     { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserClustersModel):    Record<string, TypeOf>      { return state.sortFields; }
    @Selector() static sortType(state: StateUserClustersModel):      TypeOf                      { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserClustersModel):          boolean                     { return Object.keys(StateUserClusters.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserClustersModel):         number                      { return Object.keys(StateUserClusters.data(state)).length; }
    @Selector() static getAll(state: StateUserClustersModel):        boolean                     { return StateUserClusters.sort(state) && state.sortByEntity; }

    constructor
    (
        private store:    Store,
        private service:  ServiceUserClusters,
        private clusters: ServiceClusters
    )
    {
        super();
    }

    @Action(ActionUserClustersReset)
    reset({ patchState, getState }: StateContext<StateUserClustersModel>)
    {
        const defaults: StateUserClustersModel = CoreUtil.clone<StateUserClustersModel>(StateUserClustersOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserClustersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserClustersModel>, { fetch }: ActionUserClustersGetData)
    {
        const state: StateUserClustersModel = getState();

        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserClusters.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionUserClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserCluster>) =>
                dispatch(new ActionUserClustersSet(data))
            ),
            switchMap(() =>
                StateUserClusters.getAll(state) ? of() : dispatch(new ActionUserClustersSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionUserClustersGet()) : of()
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserClustersGet)
    get({ getState, patchState }: StateContext<StateUserClustersModel>)
    {
        return super.page
        (
            getState(),
            this.clusters
        ).
        pipe
        (
            map((partial: Partial<StateUserClustersModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionUserClustersSet)
    set({ patchState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersSet)
    {
        return patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserClustersSort)
    sortData({ getState, patchState }: StateContext<StateUserClustersModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserClustersAdd)
    add({ patchState, getState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersAdd)
    {
        const entity: Cluster = payload;

        const partial: Partial<StateUserClustersModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionUserClustersRemove)
    remove({ patchState, getState }: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersRemove)
    {
        const partial: Partial<StateUserClustersModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserClustersSync)
    sync({ patchState, getState}: StateContext<StateUserClustersModel>, { payload }: ActionUserClustersSync)
    {
        const after: Cluster = payload;

        const partial: Partial<StateUserClustersModel> = this.syncData
        (
            getState(),
            after
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
