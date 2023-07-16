import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { Alert } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceFirestore<Alert> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }

  public override formCreate(object: Alert): UntypedFormGroup {
    return super.formCreate({
      ...object,

      interests: [object.interests, []]
    });
  }
}
