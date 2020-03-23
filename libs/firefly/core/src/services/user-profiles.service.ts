import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceFirestore } from '@theory/firebase';
import { UserProfile } from '@firefly/cloud';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUsersProfiles extends ServiceFirestore<UserProfile>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public formCreate(object: UserProfile): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}
