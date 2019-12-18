import { FirebaseDocument } from '../interfaces';

export interface Icon extends FirebaseDocument
{
    name       : string;
    bucketPath : string;
    mediaType  : string;
}
