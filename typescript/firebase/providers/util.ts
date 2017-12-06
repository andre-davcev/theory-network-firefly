import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class TNUtilFirebase
{
    constructor()
    {

    }

    public static timestamp() : firebase.firestore.FieldValue
    {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
}