import { UserSubscriptionsKey } from './user-subscriptions/user-subscriptions.model.key';
import { Model } from '@theory/firebase';

export interface UserSubscriptions extends Model
{
    [UserSubscriptionsKey.On]:  Record<string, string>;
    [UserSubscriptionsKey.Off]: Record<string, string>;
}
