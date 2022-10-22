import { EventType } from '@firefly/shared/enums';

export interface CalendarFilter
{
    type    : EventType;
    virtual : boolean;
}
