import { Timestamp } from 'firebase/firestore';

import { Event } from '..';

export interface DateEvents {
  date: Timestamp;
  events: Array<Event>;
}
