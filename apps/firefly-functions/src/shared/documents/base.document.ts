import { FieldValue } from '@google-cloud/firestore';

export interface DocumentBase
{
    dateCreated : FieldValue;
    dateUpdated : FieldValue;
    id          : string;
    userId      : string;
    version     : string;

    metadata?   : Record<string, any>;
}
