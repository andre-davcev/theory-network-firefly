import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of, empty } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { ActionClusterEventsRemove } from '../cluster-events';
import { Cluster, EventCluster } from '@firefly/core/models';
import { ServiceEventClusters, ServiceClusters } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

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
import { StateEvent } from '../event';

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
    @Selector() static sortField(state: StateEventClustersModel):     string                       { return state.sortField; }
    @Selector() static sortAscending(state: StateEventClustersModel): boolean                      { return state.sortAscending; }
    @Selector() static sortFields(state: StateEventClustersModel):    Record<string, TypeOf>       { return state.sortFields; }
    @Selector() static sortType(state: StateEventClustersModel):      TypeOf                       { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateEventClustersModel):          boolean                      { return Object.keys(StateEventClusters.sortFields(state)).length > 0; }
    @Selector() static count(state: StateEventClustersModel):         number                       { return Object.keys(StateEventClusters.data(state)).length; }
    @Selector() static getAll(state: StateEventClustersModel):        boolean                      { return StateEventClusters.sort(state) && state.sortByEntity; }

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

        return patchState(defaults);
    }

    @Action(ActionEventClustersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateEventClustersModel>, { fetch }: ActionEventClustersGetData)
    {
        const state: StateEventClustersModel = getState();

        const id:          string  = this.store.selectSnapshot(StateEvent.id);
        const initialized: boolean = StateEventClusters.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionEventClustersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, EventCluster>) =>
                dispatch(new ActionEventClustersSet(data))
            ),
            switchMap(() =>
                StateEventClusters.getAll(state) ? of(null) : dispatch(new ActionEventClustersSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionEventClustersGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionEventClustersGet)
    get({ getState, patchState }: StateContext<StateEventClustersModel>)
    {
        return super.page
        (
            getState(),
            this.clusters
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
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionEventClustersAdd)
    add({ patchState, getState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersAdd)
    {
        const state:  StateEventClustersModel = getState();
        const entity: Cluster                 = payload;

        const partial: Partial<StateEventClustersModel> =
        this.addData
        (
            state,
            entity,
        );

        patchState(partial);
    }

    @Action(ActionEventClustersRemove)
    remove({ patchState, getState }: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersRemove)
    {
        const partial: Partial<StateEventClustersModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionEventClustersSync)
    sync({ patchState, getState}: StateContext<StateEventClustersModel>, { payload }: ActionEventClustersSync)
    {
        const after: Cluster = payload;

        const partial: Partial<StateEventClustersModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
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
