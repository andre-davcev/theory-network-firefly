import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Subscription, UserSubscription } from '@firefly/core/models';
import { ServiceUserSubscriptions, ServiceSubscriptions } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';
import {
    ActionUserSubscriptionsAdd,
    ActionUserSubscriptionsReset,
    ActionUserSubscriptionsRemove,
    ActionUserSubscriptionsGetData,
    ActionUserSubscriptionsSort,
    ActionUserSubscriptionsGet,
    ActionUserSubscriptionsSet,
    ActionUserSubscriptionsDelete,
    ActionUserSubscriptionsOn,
    ActionUserSubscriptionsOff
} from './user-subscriptions.actions';
import { ActionClusterSubscribersRemove, ActionClusterSubscribersAdd } from '../cluster-subscribers';
import { of } from 'rxjs';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)

export class StateUserSubscriptions extends StateReferenceTable<UserSubscription, Subscription, StateUserSubscriptionsModel>
{
    @Selector() static data(state: StateUserSubscriptionsModel):        Record<string, UserSubscription> { return state.data; }
    @Selector() static keys(state: StateUserSubscriptionsModel):        Array<string>                    { return state.keys; }
    @Selector() static lookup(state: StateUserSubscriptionsModel):      Record<string, Subscription>     { return state.lookup; }
    @Selector() static list(state: StateUserSubscriptionsModel):        Array<Subscription>              { return state.list; }
    @Selector() static offset(state: StateUserSubscriptionsModel):      number                           { return state.offset; }
    @Selector() static pageSize(state: StateUserSubscriptionsModel):    number                           { return state.pageSize; }
    @Selector() static sortField(state: StateUserSubscriptionsModel):   SortField                        { return state.sortField; }
    @Selector() static initialized(state: StateUserSubscriptionsModel): boolean                          { return state.initialized; }

    constructor
    (
        private store: Store,
        private service: ServiceUserSubscriptions,
        private subscriptions: ServiceSubscriptions
    )
    {
        super();
    }

    @Action(ActionUserSubscriptionsReset)
    reset({ patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        const defaults: StateUserSubscriptionsModel = CoreUtil.clone<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserSubscriptionsGetData)
    getData({ dispatch, patchState }: StateContext<StateUserSubscriptionsModel>, { fetch }: ActionUserSubscriptionsGetData)
    {
        const id: string = this.store.selectSnapshot(StateUser.id);

        return dispatch
        ([
            new ActionUserSubscriptionsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserSubscription>) =>
                dispatch([
                    new ActionUserSubscriptionsSet(data),
                    new ActionUserSubscriptionsSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserSubscriptionsGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserSubscriptionsGet)
    get({ getState, patchState }: StateContext<StateUserSubscriptionsModel>)
    {
        const state: StateUserSubscriptionsModel = getState();

        return super.page
        (
            this.subscriptions,
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.pageSize(state),
            StateUserSubscriptions.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateUserSubscriptionsModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionUserSubscriptionsSet)
    set({ patchState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserSubscriptionsSort)
    sortData({ getState, patchState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsSort)
    {
        const state:     StateUserSubscriptionsModel      = getState();
        const data:      Record<string, UserSubscription> = StateUserSubscriptions.data(state);
        const sortField: SortField                 = payload == null ? StateUserSubscriptions.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserSubscriptionsAdd)
    add({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsAdd)
    {
        const state: StateUserSubscriptionsModel = getState();
        const subscription: Subscription         = payload;

        const userSubscription: UserSubscription =
        {
            sort: { name: subscription.name },
            on:   true
        };

        const partial: Partial<StateUserSubscriptionsModel> =
        this.addData
        (
            subscription.id,
            subscription,
            userSubscription,
            StateUserSubscriptions.data(state),
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.offset(state),
            StateUserSubscriptions.sortField(state)
        );

        patchState(partial);

        return dispatch(new ActionClusterSubscribersAdd(this.store.selectSnapshot(StateUser.data)))
    }

    @Action(ActionUserSubscriptionsRemove)
    remove({ dispatch, patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsRemove)
    {
        const state: StateUserSubscriptionsModel = getState();

        const partial: Partial<StateUserSubscriptionsModel> =
        this.removeData
        (
            payload,
            StateUserSubscriptions.data(state),
            StateUserSubscriptions.keys(state),
            StateUserSubscriptions.lookup(state),
            StateUserSubscriptions.list(state),
            StateUserSubscriptions.offset(state)
        );

        patchState(partial);

        return dispatch(new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id)));
    }

    @Action(ActionUserSubscriptionsDelete)
    delete({ dispatch }: StateContext<StateUserSubscriptionsModel>)
    {
        return dispatch
        ([
            new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id)),
            new ActionUserSubscriptionsReset()
        ]);
    }

    @Action(ActionUserSubscriptionsOn)
    on({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOn)
    {
        const id: string = payload;
        const data: Record<string, UserSubscription> = StateUserSubscriptions.data(getState());

        data[id].on = true;

        return dispatch
        ([
            new ActionUserSubscriptionsSet(data),
            new ActionClusterSubscribersAdd(this.store.selectSnapshot(StateUser.data))
        ]);
    }

    @Action(ActionUserSubscriptionsOff)
    off({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOff)
    {
        const id: string = payload;
        const data: Record<string, UserSubscription> = StateUserSubscriptions.data(getState());

        data[id].on = true;

        return dispatch
        ([
            new ActionUserSubscriptionsSet(data),
            new ActionClusterSubscribersRemove(this.store.selectSnapshot(StateUser.id))
        ]);
    }
}
