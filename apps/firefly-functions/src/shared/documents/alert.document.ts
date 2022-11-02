import { Timestamp } from '@angular/fire/firestore';

import { Place } from '../interfaces';
import { Event, MetadataEvent } from './event.document';

export interface AlertPartial
{
    read:      boolean;
    timeStart: Timestamp;
}

export interface MetadataAlert extends MetadataEvent
{
    dateTimeDate? : Date;
    sessionRead?  : boolean;
    place?        : Place;
}


export type Alert = Event & AlertPartial & { metadata: MetadataAlert };
