import { SubscriptionPartial } from '@firefly/cloud';
import { InterestType } from '@firefly/shared';

export interface InterestsFilter
{
    type          : InterestType;
    virtual       : boolean;
    subscriptions : Record<string, SubscriptionPartial>;
}
