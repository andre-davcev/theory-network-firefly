import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserProfile } from '@firefly/cloud';

import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceUsersProfiles extends ServiceFirestore<UserProfile> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }

  public override formCreate(object: UserProfile): UntypedFormGroup {
    return super.formCreate({
      ...object
    });
  }
}
