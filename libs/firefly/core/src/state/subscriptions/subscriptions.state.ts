import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ServiceSubscriptions } from '@firefly/core/services';
import { Subscription } from '@firefly/core/models';
import { StateSubscriptionsModel } from './subscriptions.state.model';
import { StateSubscriptionsOptions } from './subscriptions.state.options';
import { ActionSubscriptionsGet } from './subscriptions.actions';

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
