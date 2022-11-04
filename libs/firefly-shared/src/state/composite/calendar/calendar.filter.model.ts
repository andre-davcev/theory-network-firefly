import { EventType } from '../../../enums';

export interface CalendarFilter
{
    type    : EventType;
    virtual : boolean;
}
