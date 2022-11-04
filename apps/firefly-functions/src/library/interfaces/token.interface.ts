import { FieldValue } from 'firebase/firestore';

export interface Token
{
    token     : string;
    usedFirst : FieldValue;
    usedLast  : FieldValue;
}
