import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ServiceFirestore } from '@theory/firebase';
import { Subscription } from '@firefly/cloud';

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptions extends ServiceFirestore<Subscription> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }
}
