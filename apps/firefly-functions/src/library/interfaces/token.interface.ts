import { FieldValue } from '../types';

export interface Token
{
    token     : string;
    usedFirst : FieldValue;
    usedLast  : FieldValue;
}
