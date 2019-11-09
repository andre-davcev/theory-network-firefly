import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of, empty } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { User, ClusterSubscriber } from '@firefly/core/models';
import { ServiceClusterSubscribers, ServiceUsers } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/ngxs';

import { StateClusterSubscribersModel } from './cluster-subscribers.state.model';
import { StateClusterSubscribersOptions } from './cluster-subscribers.state.options';
import {
    ActionClusterSubscribersAdd,
    ActionClusterSubscribersReset,
    ActionClusterSubscribersRemove,
    ActionClusterSubscribersGetData,
    ActionClusterSubscribersSort,
    ActionClusterSubscribersGet,
    ActionClusterSubscribersSet,
    ActionClusterSubscribersDelete,
    ActionClusterSubscribersSync
} from './cluster-subscribers.actions';
import { ActionUserSubscriptionsRemove } from '../user-subscriptions/user-subscriptions.actions';
import { StateCluster } from '../cluster';

@State<StateClusterSubscribersModel>(StateClusterSubscribersOptions)

export class StateClusterSubscribers extends StateReferenceTable<ClusterSubscriber, User, StateClusterSubscribersModel>
{
    @Selector() static data(state: StateClusterSubscribersModel):          Record<string, ClusterSubscriber> { return state.data; }
    @Selector() static keys(state: StateClusterSubscribersModel):          Array<string>                     { return state.keys; }
    @Selector() static lookup(state: StateClusterSubscribersModel):        Record<string, User>              { return state.lookup; }
    @Selector() static list(state: StateClusterSubscribersModel):          Array<User>                       { return state.list; }
    @Selector() static offset(state: StateClusterSubscribersModel):        number                            { return state.offset; }
    @Selector() static pageSize(state: StateClusterSubscribersModel):      number                            { return state.pageSize; }
    @Selector() static initialized(state: StateClusterSubscribersModel):   boolean                           { return state.initialized; }
    @Selector() static sortField(state: StateClusterSubscribersModel):     string                            { return state.sortField; }
    @Selector() static sortAscending(state: StateClusterSubscribersModel): boolean                           { return state.sortAscending; }
    @Selector() static sortFields(state: StateClusterSubscribersModel):    Record<string, TypeOf>            { return state.sortFields; }
    @Selector() static sortType(state: StateClusterSubscribersModel):      TypeOf                            { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateClusterSubscribersModel):          boolean                           { return Object.keys(StateClusterSubscribers.sortFields(state)).length > 0; }
    @Selector() static count(state: StateClusterSubscribersModel):         number                            { return Object.keys(StateClusterSubscribers.data(state)).length; }
    @Selector() static found(state: StateClusterSubscribersModel):         boolean                           { return StateClusterSubscribers.count(state) > 0; }
    @Selector() static getAll(state: StateClusterSubscribersModel):        boolean                           { return StateClusterSubscribers.sort(state) && state.sortByEntity; }

    constructor
    (
        private store:   Store,
        private service: ServiceClusterSubscribers,
        private users:   ServiceUsers
    )
    {
        super();
    }

    @Action(ActionClusterSubscribersReset)
    reset({ patchState }: StateContext<StateClusterSubscribersModel>)
    {
        const defaults: StateClusterSubscribersModel = CoreUtil.clone<StateClusterSubscribersModel>(StateClusterSubscribersOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionClusterSubscribersGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateClusterSubscribersModel>, { fetch }: ActionClusterSubscribersGetData)
    {
        const state: StateClusterSubscribersModel = getState();

        const id:          string  = this.store.selectSnapshot(StateCluster.id);
        const initialized: boolean = StateClusterSubscribers.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionClusterSubscribersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ClusterSubscriber>) =>
                dispatch(new ActionClusterSubscribersSet(data))
            ),
            switchMap(() =>
                StateClusterSubscribers.getAll(state) ? of(null) : dispatch(new ActionClusterSubscribersSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionClusterSubscribersGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionClusterSubscribersGet)
    get({ getState, patchState }: StateContext<StateClusterSubscribersModel>)
    {
        return super.page
        (
            getState(),
            this.users
        ).
        pipe
        (
            tap((partial: Partial<StateClusterSubscribersModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionClusterSubscribersSet)
    set({ patchState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionClusterSubscribersSort)
    sortData({ getState, patchState }: StateContext<StateClusterSubscribersModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionClusterSubscribersAdd)
    add({ patchState, getState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersAdd)
    {
        const state:  StateClusterSubscribersModel = getState();
        const entity: User                         = payload;

        const partial: Partial<StateClusterSubscribersModel> =
        this.addData
        (
            state,
            entity
        );

        patchState(partial);
    }

    @Action(ActionClusterSubscribersRemove)
    remove({ patchState, getState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersRemove)
    {
        const partial: Partial<StateClusterSubscribersModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionClusterSubscribersSync)
    sync({ patchState, getState}: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersSync)
    {
        const after: User = payload;

        const partial: Partial<StateClusterSubscribersModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionClusterSubscribersDelete)
    delete({ dispatch }: StateContext<StateClusterSubscribersModel>)
    {
        return dispatch
        ([
            new ActionUserSubscriptionsRemove(this.store.selectSnapshot(StateCluster.id)),
            new ActionClusterSubscribersReset()
        ]);
    }
}
