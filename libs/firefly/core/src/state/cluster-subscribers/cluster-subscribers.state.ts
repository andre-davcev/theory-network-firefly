import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { User, ClusterSubscriber } from '@firefly/core/models';
import { ServiceClusterSubscribers, ServiceUsers } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

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
    @Selector() static sort(state: StateClusterSubscribersModel):          string                            { return state.sort; }
    @Selector() static sortAscending(state: StateClusterSubscribersModel): boolean                           { return state.sortAscending; }
    @Selector() static sortFields(state: StateClusterSubscribersModel):    Record<string, TypeOf>            { return state.sortFields; }

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
        const id:          string  = this.store.selectSnapshot(StateCluster.id);
        const initialized: boolean = StateClusterSubscribers.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionClusterSubscribersReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, ClusterSubscriber>) =>
                dispatch([
                    new ActionClusterSubscribersSet(data),
                    new ActionClusterSubscribersSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionClusterSubscribersGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionClusterSubscribersGet)
    get({ getState, patchState }: StateContext<StateClusterSubscribersModel>)
    {
        const state: StateClusterSubscribersModel = getState();

        return super.page
        (
            this.users,
            StateClusterSubscribers.keys(state),
            StateClusterSubscribers.lookup(state),
            StateClusterSubscribers.list(state),
            StateClusterSubscribers.pageSize(state),
            StateClusterSubscribers.offset(state)
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
        const state: StateClusterSubscribersModel      = getState();
        const data:  Record<string, ClusterSubscriber> = StateClusterSubscribers.data(state);

        const sortField:     string  = StateClusterSubscribers.sort(state);
        const sortAscending: boolean = StateClusterSubscribers.sortAscending(state);
        const sortType:      TypeOf  = StateClusterSubscribers.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionClusterSubscribersAdd)
    add({ patchState, getState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersAdd)
    {
        const state:  StateClusterSubscribersModel = getState();
        const entity: User                         = payload;

        const sortFields:    Record<string, TypeOf> = StateClusterSubscribers.sortFields(state);
        const sortField:     string                 = StateClusterSubscribers.sort(state);
        const sortAscending: boolean                = StateClusterSubscribers.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: ClusterSubscriber =
        {
            sort: this.sortFields(sortFields, entity)
        };

        const partial: Partial<StateClusterSubscribersModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateClusterSubscribers.data(state),
            StateClusterSubscribers.keys(state),
            StateClusterSubscribers.lookup(state),
            StateClusterSubscribers.list(state),
            StateClusterSubscribers.offset(state),
            sortField,
            sortAscending,
            sortType
        );

        patchState(partial);
    }

    @Action(ActionClusterSubscribersRemove)
    remove({ patchState, getState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersRemove)
    {
        const state: StateClusterSubscribersModel = getState();

        const partial: Partial<StateClusterSubscribersModel> =
        this.removeData
        (
            payload,
            StateClusterSubscribers.data(state),
            StateClusterSubscribers.keys(state),
            StateClusterSubscribers.lookup(state),
            StateClusterSubscribers.list(state),
            StateClusterSubscribers.offset(state)
        );

        patchState(partial);
    }

    @Action(ActionClusterSubscribersSync)
    sync({ patchState, getState}: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersSync)
    {
        const state:  StateClusterSubscribersModel = getState();
        const object: User                         = payload;
        const id:     string                       = object.id;
        const list:   Array<User>                  = StateClusterSubscribers.list(state);
        const lookup: Record<string, User>         = StateClusterSubscribers.lookup(state);

        const index: number = list.findIndex((item: User) => item.id === id);

        if (index >= 0)
        {
            list[index] = object;
        }

        lookup[object.id] = object;

        patchState({ list, lookup });
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
