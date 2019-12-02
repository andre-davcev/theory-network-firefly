import { Model } from '@theory/firebase';
import { firestore } from 'firebase/app';

export interface Alert extends Model
{
    name        : string;
    description : string;
    bucketPath  : string;
    eventId     : string;
    clusterId   : string;
    dateTime    : firestore.FieldValue;
    url?        : string;
    read        : boolean;

    imageUrl?     : string;
    dateTimeDate? : Date;
}
