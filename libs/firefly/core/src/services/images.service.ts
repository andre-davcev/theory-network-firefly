import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Image } from '../models';
import { FormBuilder } from '@angular/forms';
import { ServiceFirestore } from '@theory/firebase';
import { CoreEnum } from '@theory/core';

@Injectable({ providedIn: 'root' })
export class ServiceImages extends ServiceFirestore<Image>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public addMetadata(entity: Image, collection: string, dataUri: string): Image
    {
        const start: number = dataUri.indexOf('/') + 1;
        const end:   number = dataUri.indexOf(';');

        entity.id         = entity.id === CoreEnum.IdNew ? this.firestore.createId() : entity.id;;
        entity.mediaType  = dataUri.substring(start, end);
        entity.bucketPath = `${entity.userId}/${collection}/${entity.id}.${entity.mediaType}`;

        return entity;
    }
}
