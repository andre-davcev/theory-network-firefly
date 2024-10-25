import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';

import { List } from '@firefly/cloud';
import { ValidatorsExtended } from '@theory/core';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceLists extends ServiceFirestore<List> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }

  /*
    private static validateIcon(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = control.value;

            return url != null ? null : { iconUrlInvalid: true };
        };

        return validator;
    }
*/

  public override formCreate(list: List): UntypedFormGroup {
    return super.formCreate({
      ...list,

      name: [list.name, [Validators.required, ValidatorsExtended.minLength(1)]],
      description: [
        list.description,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],

      tagline: [
        list.tagline,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],

      metadata: this.formBuilder.group({
        image: [list.metadata.image, [Validators.required]]
      })
    });
  }
}
