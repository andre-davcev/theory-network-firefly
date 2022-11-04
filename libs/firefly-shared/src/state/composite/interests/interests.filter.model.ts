import { SubscriptionPartial } from '@firefly/cloud';

import { InterestType } from '../../../enums';

export interface InterestsFilter
{
    type          : InterestType;
    virtual       : boolean;
    subscriptions : Record<string, SubscriptionPartial>;
}
