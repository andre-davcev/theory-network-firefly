import { Timestamp } from 'firebase-admin/firestore';

import { Event } from '..';

export interface DateEvents {
  date: Timestamp;
  events: Array<Event>;
}
