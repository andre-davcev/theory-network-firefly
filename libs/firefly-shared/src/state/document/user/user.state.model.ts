import { StateDocumentModel } from '@theory/ngxs';
import { User } from '@theory/firebase';
import { FirebaseError } from '@angular/fire/app';

export interface StateUserModel extends StateDocumentModel
{
    authData        : User;
    error           : Error;
    errorAuth       : FirebaseError;
    authenticating  : boolean;
    initialized     : boolean;
}
