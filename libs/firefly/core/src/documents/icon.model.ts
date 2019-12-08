import { FirebaseDocument } from '@theory/firebase';

export interface Icon extends FirebaseDocument
{
    name       : string;
    bucketPath : string;
    mediaType  : string;
}
