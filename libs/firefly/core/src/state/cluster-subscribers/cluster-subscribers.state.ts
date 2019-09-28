import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateCluster } from '@firefly/core/state';
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
    ActionClusterSubscribersDelete
} from './cluster-subscribers.actions';

@State<StateClusterSubscribersModel>(StateClusterSubscribersOptions)

export class StateClusterSubscribers extends StateReferenceTable<ClusterSubscriber, User, StateClusterSubscribersModel>
{
    @Selector() static data(state: StateClusterSubscribersModel):      Record<string, ClusterSubscriber> { return state.data; }
    @Selector() static keys(state: StateClusterSubscribersModel):      Array<string>                     { return state.keys; }
    @Selector() static lookup(state: StateClusterSubscribersModel):    Record<string, User>              { return state.lookup; }
    @Selector() static list(state: StateClusterSubscribersModel):      Array<User>                       { return state.list; }
    @Selector() static offset(state: StateClusterSubscribersModel):    number                            { return state.offset; }
    @Selector() static pageSize(state: StateClusterSubscribersModel):  number                            { return state.pageSize; }
    @Selector() static sortField(state: StateClusterSubscribersModel): SortField                         { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceClusterSubscribers,
        private users: ServiceUsers
    )
    {
        super();
    }

    @Action(ActionClusterSubscribersReset)
    reset({ patchState }: StateContext<StateClusterSubscribersModel>)
    {
        const defaults: StateClusterSubscribersModel = CoreUtil.clone<StateClusterSubscribersModel>(StateClusterSubscribersOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionClusterSubscribersGetData)
    getData({ dispatch }: StateContext<StateClusterSubscribersModel>)
    {
        const userId: string = this.store.selectSnapshot(StateCluster.id);

        return dispatch(new ActionClusterSubscribersReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, ClusterSubscriber>) =>
                dispatch([
                    new ActionClusterSubscribersSet(data),
                    new ActionClusterSubscribersSort()
                ])
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
    sortData({ getState, patchState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersSort)
    {
        const state:     StateClusterSubscribersModel      = getState();
        const data:      Record<string, ClusterSubscriber> = StateClusterSubscribers.data(state);
        const sortField: SortField                         = payload == null ? StateClusterSubscribers.sortField(state) : payload;
        const keys:      Array<string>                     = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionClusterSubscribersAdd)
    add({ patchState, getState }: StateContext<StateClusterSubscribersModel>, { payload }: ActionClusterSubscribersAdd)
    {
        const state: StateClusterSubscribersModel = getState();
        const user: User              = payload;

        const clusterSubscriber: ClusterSubscriber =
        {
            sort: { name: user.email }
        };

        const partial: Partial<StateClusterSubscribersModel> =
        this.addData
        (
            user.id,
            user,
            clusterSubscriber,
            StateClusterSubscribers.data(state),
            StateClusterSubscribers.keys(state),
            StateClusterSubscribers.lookup(state),
            StateClusterSubscribers.list(state),
            StateClusterSubscribers.offset(state),
            StateClusterSubscribers.sortField(state)
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

    @Action(ActionClusterSubscribersDelete)
    delete({ dispatch }: StateContext<StateClusterSubscribersModel>)
    {

    }
}
