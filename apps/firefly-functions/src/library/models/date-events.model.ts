import { Event } from '../documents';
import { Timestamp } from '../types';

export interface DateEvents
{
    date   : Timestamp;
    events : Array<Event>;
}
