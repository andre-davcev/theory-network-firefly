import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceBase } from '@theory/firebase';
import { UserIcon } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUserIcons extends ServiceBase<Record<string, UserIcon>>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('user-icons', firestore, formBuilder, true);
    }
}
