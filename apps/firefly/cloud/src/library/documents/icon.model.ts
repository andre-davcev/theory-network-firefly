import { FirebaseDocument } from '../interfaces';

export interface Icon extends FirebaseDocument
{
    bucketPath : string;
    mediaType  : string;
    name       : string;
}
