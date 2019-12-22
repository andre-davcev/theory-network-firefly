import { FirebaseDocument } from '../interfaces';
import { firestore } from 'firebase/app';
import { MetadataAlert } from '../models/alert.metadata';

export interface Alert extends FirebaseDocument
{
    bucketPath  : string;
    clusterId   : string;
    dateTime    : firestore.FieldValue;
    description : string;
    eventId     : string;
    name        : string;
    read        : boolean;
    tokens      : Array<string>;
    url?        : string;

    metadata? : MetadataAlert;
}
