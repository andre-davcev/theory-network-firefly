import { Document } from '@theory/firebase';

export interface User extends Document
{
    providerId  : string;
    language    : string;
    email       : string;
    phoneNumber : string;
    tokens      : Record<string, string>;
}
