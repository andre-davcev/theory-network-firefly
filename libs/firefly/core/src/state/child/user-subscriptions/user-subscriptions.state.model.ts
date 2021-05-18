import { Subscription, SubscriptionPartial } from '@firefly/cloud';
import { StateChildModel } from '@theory/ngxs';

export interface StateUserSubscriptionsModel extends StateChildModel<Subscription>
{
    subscriptions: Record<string, SubscriptionPartial>;
}
