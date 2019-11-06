import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceAsset } from '@theory/firebase';
import { StreamItem, Cluster } from '@firefly/core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServiceStreamItems extends ServiceAsset<StreamItem>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('clusters', firestore, formBuilder, storage, true);
    }

    public formCreate(object: StreamItem): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }

    public snapshot(id: string): Observable<StreamItem>
    {
        return super.snapshot(id).
            pipe(map((data: Cluster) => ({...data, subscribed: false})));
    }
}

