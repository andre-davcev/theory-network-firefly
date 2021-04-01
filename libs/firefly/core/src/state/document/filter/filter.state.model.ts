import { InterestType, EventType } from '@firefly/core/enums';

export interface StateFilterModel
{
    interestType    : InterestType;
    interestVirtual : boolean;
    eventType       : EventType;
    eventVirtual    : boolean;
}
