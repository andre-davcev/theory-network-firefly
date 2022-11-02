import { Timestamp } from '@angular/fire/firestore';

import { Event } from '../../shared';

export interface DateEvents
{
    date   : Timestamp;
    events : Array<Event>;
}
