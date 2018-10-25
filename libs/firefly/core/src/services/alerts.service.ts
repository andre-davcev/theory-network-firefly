import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { Alert } from '@firefly/core/models';
import { MockAlerts } from '@firefly/core/mocks';

@Injectable({ providedIn: 'root' })
export class ServiceAlerts
{
    constructor(private firestore: AngularFirestore) { }

    public get(uid: string): Observable<Array<Alert>>
    {
        return this.firestore.collection<Alert>('alerts', (ref: CollectionReference) =>

        ref.
        where('uid', '==', uid).
        limit(20)).
        valueChanges();
    }

    public getMock(uid: string): Observable<Array<Alert>>
    {
        return of(MockAlerts);
    }
}
