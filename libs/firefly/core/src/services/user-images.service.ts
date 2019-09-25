import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserImage } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUserImages extends ServiceBase<Record<string, UserImage>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('user-images', firestore, formBuilder, true);
    }
}
