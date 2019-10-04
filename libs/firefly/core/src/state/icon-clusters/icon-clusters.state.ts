import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
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
    ActionIconClustersDelete,
    ActionIconClustersSync
} from './icon-clusters.actions';
import { StateIcon } from '../icon';

@State<StateIconClustersModel>(StateIconClustersOptions)

export class StateIconClusters extends StateReferenceTable<IconCluster, Cluster, StateIconClustersModel>
{
    @Selector() static data(state: StateIconClustersModel):        Record<string, IconCluster> { return state.data; }
    @Selector() static keys(state: StateIconClustersModel):        Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateIconClustersModel):      Record<string, Cluster>     { return state.lookup; }
    @Selector() static list(state: StateIconClustersModel):        Array<Cluster>              { return state.list; }
    @Selector() static offset(state: StateIconClustersModel):      number                      { return state.offset; }
    @Selector() static pageSize(state: StateIconClustersModel):    number                      { return state.pageSize; }
    @Selector() static sortField(state: StateIconClustersModel):   SortField                   { return state.sortField; }
    @Selector() static initialized(state: StateIconClustersModel): boolean                     { return state.initialized; }

    constructor
    (
        private store:    Store,
        private service:  ServiceIconClusters,
        private clusters: ServiceClusters
    )
    {
        super();
    }

    @Action(ActionIconClustersReset)
    reset({ patchState }: StateContext<StateIconClustersModel>)
    {
        const defaults: StateIconClustersModel = CoreUtil.clone<StateIconClustersModel>(StateIconClustersOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionIconClustersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateIconClustersModel>, { fetch }: ActionIconClustersGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateIcon.id);
        const initialized: boolean = StateIconClusters.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionIconClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, IconCluster>) =>
                dispatch([
                    new ActionIconClustersSet(data),
                    new ActionIconClustersSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionIconClustersGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
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

    @Action(ActionIconClustersSync)
    sync({ patchState, getState}: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersSync)
    {
        const state:  StateIconClustersModel = getState();
        const object: Cluster                 = payload;
        const id:     string                  = object.id;
        const list:   Array<Cluster>          = StateIconClusters.list(state);
        const lookup: Record<string, Cluster> = StateIconClusters.lookup(state);

        const index: number = list.findIndex((item: Cluster) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
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
