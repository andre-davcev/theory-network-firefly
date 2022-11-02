import { Timestamp } from '@angular/fire/firestore';

export interface AlertPartial
{
    read:      boolean;
    timeStart: Timestamp;
}
