import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Subscription, StateSubscriptionsModel, ActionSubscriptionsGet, ServiceSubscriptions, StateSubscriptionsOptions } from '@firefly/core';



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
