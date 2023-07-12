import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { User } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';

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
