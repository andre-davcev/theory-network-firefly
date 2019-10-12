import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Cluster, IconCluster } from '@firefly/core/models';
import { ServiceIconClusters, ServiceClusters } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

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
    @Selector() static data(state: StateIconClustersModel):          Record<string, IconCluster> { return state.data; }
    @Selector() static keys(state: StateIconClustersModel):          Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateIconClustersModel):        Record<string, Cluster>     { return state.lookup; }
    @Selector() static list(state: StateIconClustersModel):          Array<Cluster>              { return state.list; }
    @Selector() static offset(state: StateIconClustersModel):        number                      { return state.offset; }
    @Selector() static pageSize(state: StateIconClustersModel):      number                      { return state.pageSize; }
    @Selector() static initialized(state: StateIconClustersModel):   boolean                     { return state.initialized; }
    @Selector() static sortField(state: StateIconClustersModel):     string                      { return state.sortField; }
    @Selector() static sortAscending(state: StateIconClustersModel): boolean                     { return state.sortAscending; }
    @Selector() static sortFields(state: StateIconClustersModel):    Record<string, TypeOf>      { return state.sortFields; }
    @Selector() static sortType(state: StateIconClustersModel):      TypeOf                      { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateIconClustersModel):          boolean                     { return Object.keys(StateIconClusters.sortFields(state)).length > 0; }
    @Selector() static count(state: StateIconClustersModel):         number                      { return Object.keys(StateIconClusters.data(state)).length; }

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
        return super.page
        (
            getState(),
            this.clusters
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
    sortData({ getState, patchState }: StateContext<StateIconClustersModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionIconClustersAdd)
    add({ patchState, getState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersAdd)
    {
        const entity: Cluster = payload;

        const partial: Partial<StateIconClustersModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionIconClustersRemove)
    remove({ patchState, getState }: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersRemove)
    {
        const partial: Partial<StateIconClustersModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionIconClustersSync)
    sync({ patchState, getState}: StateContext<StateIconClustersModel>, { payload }: ActionIconClustersSync)
    {
        const after: Cluster = payload;

        const partial: Partial<StateIconClustersModel> = this.syncData
        (
            getState(),
            after
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
