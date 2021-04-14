import { StateDocumentModel } from '@theory/ngxs';
import { FirebaseError } from 'firebase/app';

export interface StateUserModel extends StateDocumentModel
{
    authData        : firebase.User;
    error           : Error;
    errorAuth       : FirebaseError;
    authenticating  : boolean;
    initialized     : boolean;
}
