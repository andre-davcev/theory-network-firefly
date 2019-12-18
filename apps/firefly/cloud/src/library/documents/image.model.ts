import { FirebaseDocument } from '../interfaces';

export interface Image extends FirebaseDocument
{
    name       : string;
    bucketPath : string;
    mediaType  : string;
}
