import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

import { TypeOf } from '../enums';

export class ValidatorsExtended {
  static minLength(minLength: number): ValidatorFn {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): Record<string, any> => {
      let validation: Record<string, any> = null;

      if (Validators.required(control) == null) {
        const value: string | any =
          typeof control.value === TypeOf.String
            ? control.value.trim()
            : control.value;
        const length: number =
          typeof value === TypeOf.String
            ? (value as string).length
            : Object.keys(value).length;

        validation =
          length < minLength
            ? { minlength: { requiredLength: minLength, actualLength: length } }
            : null;
      }

      return validation;
    };

    return validator;
  }
}
