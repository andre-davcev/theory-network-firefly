import { State, Action, StateContext, Store } from '@ngxs/store';

import { Subscription } from '@firefly/cloud';
import { ServiceSubscriptions } from '@firefly/core/services';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';
import {
    ActionUserSubscriptionsAdd,
    ActionUserSubscriptionsReset,
    ActionUserSubscriptionsRemove,
    ActionUserSubscriptionsGetData,
    ActionUserSubscriptionsGet,
    ActionUserSubscriptionsOn,
    ActionUserSubscriptionsOff,
    ActionUserSubscriptionsSync
} from './user-subscriptions.actions';
import { StateChild } from '@theory/ngxs';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)

export class StateUserSubscriptions extends StateChild<Subscription, StateUserSubscriptionsModel>
{
    constructor
    (
        private store: Store,
        service: ServiceSubscriptions
    )
    {
        super
        (

            StateUserSubscriptionsOptions.defaults,
            {
                ActionReset   : ActionUserSubscriptionsReset,
                ActionGetData : ActionUserSubscriptionsGetData,
                ActionGet     : ActionUserSubscriptionsGet,
                ActionAdd     : ActionUserSubscriptionsAdd,
                ActionRemove  : ActionUserSubscriptionsRemove,
                ActionSync    : ActionUserSubscriptionsSync
            },
            service,
            'clusters',
            'user-subscriptions'
        );
    }

    @Action(ActionUserSubscriptionsReset)
    reset(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsReset)
    {
        return super.reset(context, action);
    }

    @Action(ActionUserSubscriptionsGetData)
    getData(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsGetData)
    {
        return super.getData(context, action);
    }

    @Action(ActionUserSubscriptionsGet)
    get(context: StateContext<StateUserSubscriptionsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserSubscriptionsAdd)
    add(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserSubscriptionsRemove)
    remove(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserSubscriptionsSync)
    sync(context: StateContext<StateUserSubscriptionsModel>, action: ActionUserSubscriptionsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionUserSubscriptionsOn)
    on({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOn)
    {

    }

    @Action(ActionUserSubscriptionsOff)
    off({ dispatch, getState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsOff)
    {

    }
}
