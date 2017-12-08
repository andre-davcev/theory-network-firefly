import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseUtil
{
    constructor()
    {

    }

    public static timestamp() : firebase.firestore.FieldValue
    {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
}