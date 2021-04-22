import { Event } from '../documents';
import { Timestamp } from '@theory/firebase';

export interface DateEvents
{
    date   : Timestamp;
    events : Array<Event>;
}
