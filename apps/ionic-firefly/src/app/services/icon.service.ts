import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, filter, take, map } from 'rxjs/operators';

import { Icon } from '../models/icon.model';

@Injectable()
export class ServiceIcons
{
    private icons: AngularFirestoreCollection<Icon>;

    constructor (private firestore: AngularFirestore)
    {
        this.icons = firestore.collection<Icon>('icons');
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

    set(icon: Icon): Observable<Icon>
    {
        const id = this.firestore.createId();

        icon.id = id;
        const document: AngularFirestoreDocument<Icon> = this.icons.doc(id) as AngularFirestoreDocument<Icon>;

        return fromPromise(document.set(icon)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((icon: Icon) => icon.dateCreated != null),

            take(1)
        );
    }
}
