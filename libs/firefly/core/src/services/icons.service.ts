import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Icon } from '../models';
import { FormBuilder } from '@angular/forms';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceIcons extends ServiceFirestore<Icon>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public addMetadata(entity: Icon, collection: string, dataUri: string): Icon
    {
        const start: number = dataUri.indexOf('/') + 1;
        const end:   number = dataUri.indexOf(';');

        entity.id         = this.firestore.createId();
        entity.mediaType  = dataUri.substring(start, end);
        entity.bucketPath = `${entity.userId}/${collection}/${entity.id}.${entity.mediaType}`;

        return entity;
    }
}
