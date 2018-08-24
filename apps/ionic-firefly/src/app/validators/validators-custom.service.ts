import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

export class ValidatorsCustom
{
    static minLength(minLength: number): ValidatorFn
    {
        return (control: AbstractControl): { [key: string]: any } =>
        {
            let validation: { [key: string]: any } = null;

            if (Validators.required(control) == null)
            {
                const value: string = control.value ? control.value : '';

                validation = value.trim().length < minLength ? { 'minlength': { 'requiredLength': minLength, 'actualLength': value.trim().length } } : null;
            }

            return validation;
        };
    }
}
