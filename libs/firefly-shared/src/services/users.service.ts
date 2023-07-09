import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { User } from '@firefly/cloud';

@Injectable({ providedIn: 'root' })
export class ServiceUsers extends ServiceFirestore<User> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }

  public formCreate(object: User): UntypedFormGroup {
    return super.formCreate({
      ...object,
      subscriptions: [object.subscriptions],
      tokens: object.tokens
    });
  }
}
