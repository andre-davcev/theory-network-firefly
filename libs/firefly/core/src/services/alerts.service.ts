import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { Alert } from '@firefly/core/models';

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
        const alerts: Array<Alert> =
        [
            {
                image : 'assets/images/temp-notifications-rusted.root.jpg',
                title : 'Rusted Root',
                body  : "Sahlen's Music Stage",
                read  : false,
                date  : 'May 12, 2017 at 7:00pm'
            },

            {
                image : 'assets/images/temp-notifications-foster.the.people.jpg',
                title : 'Foster The People',
                body  : "Ommegang Brewery Cooperstown",
                read  : false,
                date  : 'June 10, 2017 at 7:00pm'
            },

            {
                image : 'assets/images/temp-notifications-blondie.jpg',
                title : 'Blondie',
                body  : "Artpark",
                read  : false,
                date  : 'July 25, 2016 at 6:30pm'
            }
        ];

        return of(alerts);
    }
}
