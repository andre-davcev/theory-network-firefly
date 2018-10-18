import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { tap } from 'rxjs/operators';

import { Subscription } from '@firefly/core';

import { ActionSubscriptionsGet } from './subscriptions.actions';
import { ServiceSubscriptions } from '../../services/subscriptions.service';

export interface StateSubscriptionsModel
{
    subscriptions : Array<Subscription>;
}

export const StateSubscriptionsOptions: StoreOptions<StateSubscriptionsModel> =
{
    name : 'subscriptions',

    defaults :
    {
        subscriptions : []
    }
};

@State<StateSubscriptionsModel>(StateSubscriptionsOptions)

export class StateSubscriptions
{
    @Selector() static subscriptions(state: StateSubscriptionsModel) {return state.subscriptions;}

    constructor(private subscriptions: ServiceSubscriptions) {}

    @Action(ActionSubscriptionsGet)
    subscriptionsGet({ patchState }: StateContext<StateSubscriptionsModel>)
    {
        return this.subscriptions.get().pipe
        (
            tap((subscriptions: Array<Subscription>) => patchState({subscriptions}))
        );
    }
}
