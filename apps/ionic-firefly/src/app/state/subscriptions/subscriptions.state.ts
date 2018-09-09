import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Subscription } from '../../models/subscription.model';
import { SubscriptionsGet } from './subscriptions.actions';

import { ServiceSubscriptions } from '../../services/subscriptions.service';

export interface StateSubscriptionsModel
{
    subscriptions : Array<Subscription>;
}

@State<StateSubscriptionsModel>
({
    name : 'subscriptions',

    defaults :
    {
        subscriptions : []
    }
})

export class StateSubscriptions
{
    @Selector() static subscriptions(state: StateSubscriptionsModel) {return state.subscriptions;}

    constructor(private subscriptions: ServiceSubscriptions) {}

    @Action(SubscriptionsGet)
    subscriptionsGet({ patchState }: StateContext<StateSubscriptionsModel>)
    {
        return this.subscriptions.get().pipe
        (
            tap((subscriptions: Array<Subscription>) => patchState({subscriptions}))
        );
    }
}
