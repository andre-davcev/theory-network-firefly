import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { StreamItem } from '@firefly/core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceStreamItems extends ServiceBase<StreamItem>
{
    constructor(firestore: AngularFirestore)
    {
        super('clusters', firestore, true);
    }

    public valuesChanges(id: string): Observable<StreamItem>
    {
        return super.valuesChanges(id).
            pipe(map((data: StreamItem) => ({...data, subscribed: false})));
    }
}

