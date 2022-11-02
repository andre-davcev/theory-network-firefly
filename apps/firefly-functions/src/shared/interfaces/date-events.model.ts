import { Timestamp } from '@angular/fire/firestore';

import { Event } from '..';

export interface DateEvents
{
    date   : Timestamp;
    events : Array<Event>;
}
