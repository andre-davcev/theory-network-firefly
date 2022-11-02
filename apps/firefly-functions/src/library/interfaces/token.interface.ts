import { FieldValue } from '@angular/fire/firestore';

export interface Token
{
    token     : string;
    usedFirst : FieldValue;
    usedLast  : FieldValue;
}
