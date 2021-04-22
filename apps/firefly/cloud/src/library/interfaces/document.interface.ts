import { FieldValue } from '@theory/firebase';

export interface FirebaseDocument
{
    dateCreated : FieldValue;
    dateUpdated : FieldValue;
    id          : string;
    userId      : string;
    version     : string;

    metadata?   : Record<string, any>;
}
