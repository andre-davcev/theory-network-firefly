import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceBase } from '@theory/firebase';
import { StreamItem, Cluster } from '@firefly/core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceStreamItems extends ServiceBase<StreamItem>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('clusters', firestore, formBuilder, true);
    }

    public snapshot(id: string): Observable<StreamItem>
    {
        return super.snapshot(id).
            pipe(map((data: Cluster) => ({...data, subscribed: false})));
    }
}

