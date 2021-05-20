import { SubscriptionPartial } from '@firefly/cloud';
import { InterestType } from '@firefly/core';

export interface InterestsFilter
{
    type          : InterestType;
    virtual       : boolean;
    subscriptions : Record<string, SubscriptionPartial>;
}
