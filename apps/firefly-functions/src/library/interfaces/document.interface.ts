import { FieldValue } from '../types';

export interface FirebaseDocument
{
    dateCreated : FieldValue;
    dateUpdated : FieldValue;
    id          : string;
    userId      : string;
    version     : string;

    metadata?   : Record<string, any>;
}
