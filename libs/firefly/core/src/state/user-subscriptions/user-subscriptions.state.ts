import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

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
    ActionUserSubscriptionsSet
} from './user-subscriptions.actions';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)

export class StateUserSubscriptions extends StateReferenceTable<UserSubscription, Subscription, StateUserSubscriptionsModel>
{
    @Selector() static data(state: StateUserSubscriptionsModel):      Record<string, UserSubscription> { return state.data; }
    @Selector() static keys(state: StateUserSubscriptionsModel):      Array<string>                    { return state.keys; }
    @Selector() static lookup(state: StateUserSubscriptionsModel):    Record<string, Subscription>     { return state.lookup; }
    @Selector() static list(state: StateUserSubscriptionsModel):      Array<Subscription>              { return state.list; }
    @Selector() static offset(state: StateUserSubscriptionsModel):    number                           { return state.offset; }
    @Selector() static pageSize(state: StateUserSubscriptionsModel):  number                           { return state.pageSize; }
    @Selector() static sortField(state: StateUserSubscriptionsModel): SortField                        { return state.sortField; }

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
    getData({ dispatch }: StateContext<StateUserSubscriptionsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserSubscriptionsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserSubscription>) =>
                dispatch([
                    new ActionUserSubscriptionsSet(data),
                    new ActionUserSubscriptionsSort()
                ])
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
    add({ patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsAdd)
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
    }

    @Action(ActionUserSubscriptionsRemove)
    remove({ patchState, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsRemove)
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
    }
}
