import { StateDocumentModel } from '@theory/ngxs';
import { FirebaseError, User } from '@theory/firebase';

export interface StateUserModel extends StateDocumentModel
{
    authData        : User;
    error           : Error;
    errorAuth       : FirebaseError;
    authenticating  : boolean;
    initialized     : boolean;
}
