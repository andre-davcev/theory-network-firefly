import { Event } from '../documents';
import { firestore } from 'firebase/app';

export interface DateEvents
{
    date   : firestore.Timestamp;
    events : Array<Event>;
}
