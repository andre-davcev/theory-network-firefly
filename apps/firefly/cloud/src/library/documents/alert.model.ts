import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase/app';
import { AlertMetadata } from '../models/alert.metadata.model';

export interface Alert extends FirebaseDocument
{
    name        : string;
    description : string;
    bucketPath  : string;
    eventId     : string;
    clusterId   : string;
    dateTime    : firestore.FieldValue;
    read        : boolean;
    tokens      : Array<string>;
    url?        : string;

    metadata : AlertMetadata;
}
