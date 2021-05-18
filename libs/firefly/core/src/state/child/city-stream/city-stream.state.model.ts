import { StateChildModel } from '@theory/ngxs';
import { StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { InterestType } from '@firefly/core/enums';

export interface StateCityStreamModel extends StateChildModel<StreamInterest>
{
    subscriptions : Record<string, SubscriptionPartial>;
    type          : InterestType;
}
