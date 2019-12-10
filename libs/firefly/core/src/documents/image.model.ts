import { FirebaseDocument } from '@theory/firebase';

export interface Image extends FirebaseDocument
{
    name       : string;
    bucketPath : string;
    mediaType  : string;
}
