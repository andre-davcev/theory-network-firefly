import { FieldValue } from '@angular/fire/firestore';

export interface FirebaseDocument
{
    dateCreated : FieldValue;
    dateUpdated : FieldValue;
    id          : string;
    userId      : string;
    version     : string;

    metadata?   : Record<string, any>;
}
