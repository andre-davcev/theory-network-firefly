import { StateReferenceTableModel } from '@theory/ngxs';
import { Subscription, UserSubscription } from '@firefly/core/models';

export interface StateUserSubscriptionsModel extends StateReferenceTableModel<UserSubscription, Subscription>
{

}
