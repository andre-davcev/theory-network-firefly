import { FieldValue } from '@google-cloud/firestore';

export interface Token {
  token: string;
  usedFirst: FieldValue;
  usedLast: FieldValue;
}
