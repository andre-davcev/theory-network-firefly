import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';

import { Interest } from '@firefly/cloud';
import { ValidatorsExtended } from '@theory/core';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceInterests extends ServiceFirestore<Interest> {
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

  public formCreate(interest: Interest): UntypedFormGroup {
    return super.formCreate({
      ...interest,

      name: [
        interest.name,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],
      description: [
        interest.description,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],

      tagline: [
        interest.tagline,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],

      metadata: this.formBuilder.group({
        image: [interest.metadata.image, [Validators.required]]
      })
    });
  }
}
