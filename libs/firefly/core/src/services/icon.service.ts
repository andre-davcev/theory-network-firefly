import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { switchMap, filter, take, map } from 'rxjs/operators';

import { Icon } from '@firefly/core/models';
import { ServiceMedia } from './media.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ServiceUser } from './user.service';

@Injectable({ providedIn: 'root' })
export class ServiceIcon extends ServiceMedia<Icon>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser
    )
    {
        super('icons', firestore, storage, user);
    }

    get(userId: String): Observable<Array<Icon>>
    {
        return this.firestore.collection<Icon>('icons', ref =>
        {
            return ref.where('userid', '==', userId)
        }).

        snapshotChanges().

        pipe(
          map((actions: Array<DocumentChangeAction<any>>) => {
            return actions.map(action =>
            {
                const data: Icon = action.payload.doc.data() as Icon;
                const id         = action.payload.doc.id;

                return { id, ...data };
            })
        }));
    }

    update()
    {

    }

    setIcon(icon: Icon): Observable<Icon>
    {
        const id = this.firestore.createId();

        icon.id = id;
        const document: AngularFirestoreDocument<Icon> = this.document(id) as AngularFirestoreDocument<Icon>;

        return from(document.set(icon)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((ico: Icon) => ico.dateCreated != null),

            take(1)
        );
    }
}
