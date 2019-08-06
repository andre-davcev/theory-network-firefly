import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { Alert, UserAlert } from '@firefly/core/models';
import { MockAlerts } from '@firefly/core/mocks';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceUserAlerts extends ServiceBase<Record<string, UserAlert>>
{
    constructor(firestore: AngularFirestore)
    {
        super('user-alerts', firestore, true);
    }

    public getMock(uid: string): Observable<Array<Alert>>
    {
        return of(MockAlerts);
    }
}
