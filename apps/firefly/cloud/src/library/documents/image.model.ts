import { FirebaseDocument } from '../interfaces';

export interface Image extends FirebaseDocument
{
    bucketPath : string;
    mediaType  : string;
    name       : string;
}
