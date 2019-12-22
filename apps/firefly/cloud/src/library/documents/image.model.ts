import { FirebaseDocument } from '../interfaces';

export interface Image extends FirebaseDocument
{
    bucketPath : string;
    name       : string;
    mediaType  : string;
}
