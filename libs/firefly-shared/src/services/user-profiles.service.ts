import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ServiceFirestore } from '@theory/firebase';
import { UserProfile } from '@firefly/cloud';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ServiceUsersProfiles extends ServiceFirestore<UserProfile>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: UntypedFormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public formCreate(object: UserProfile): UntypedFormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}
