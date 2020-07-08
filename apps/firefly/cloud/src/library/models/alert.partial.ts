import { firestore } from 'firebase/app';

export interface AlertPartial
{
    read:      boolean;
    timeStart: firestore.Timestamp;
}
