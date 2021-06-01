import { EventType } from '@firefly/core/enums';

export interface CalendarFilter
{
    type    : EventType;
    virtual : boolean;
}
