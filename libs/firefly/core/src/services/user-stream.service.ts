import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserStreamItem } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUserStream extends ServiceBase<Record<string, UserStreamItem>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('user-stream', firestore, formBuilder, true);
    }
}
