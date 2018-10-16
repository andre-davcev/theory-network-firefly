import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

export class ValidatorsExtended
{
    static minLength(minLength: number): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            let validation: { [key: string]: any } = null;

            if (Validators.required(control) == null)
            {
                const value: string = control.value ? control.value : '';

                validation = value.trim().length < minLength ? { 'minlength': { 'requiredLength': minLength, 'actualLength': value.trim().length } } : null;
            }

            return validation;
        };

        return validator;
    }
}
