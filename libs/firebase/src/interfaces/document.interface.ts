import { FieldValue } from '@angular/fire/firestore';

export interface FirebaseDocument {
  version: string;
  id: string;
  userId: string;
  dateCreated: FieldValue;
  dateUpdated: FieldValue;
  metadata?: Record<string, any>;
}
