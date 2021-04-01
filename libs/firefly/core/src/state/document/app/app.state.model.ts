import { InterestType, EventType } from '@firefly/core/enums';

export interface StateAppModel
{
    loading         : boolean;
    interestType    : InterestType;
    interestVirtual : boolean;
    eventType       : EventType;
    eventVirtual    : boolean;
}
