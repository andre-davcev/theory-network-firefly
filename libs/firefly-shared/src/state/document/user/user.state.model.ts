import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';

import { StateDocumentModel } from '@theory/ngxs';

export interface StateUserModel extends StateDocumentModel {
  authData: User;
  error: Error;
  errorAuth: FirebaseError;
  authenticating: boolean;
  initialized: boolean;
}
