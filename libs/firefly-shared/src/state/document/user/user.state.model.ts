import { FirebaseError } from '@angular/fire/app';

import { User } from '@theory/firebase';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateUserModel extends StateDocumentModel {
  authData: User | null;
  error: Error | null;
  errorAuth: FirebaseError | null;
  authenticating: boolean;
  initialized: boolean;
}
