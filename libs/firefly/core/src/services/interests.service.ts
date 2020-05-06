import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Interest } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { ValidatorsExtended } from '@theory/core';


@Injectable({ providedIn: 'root' })
export class ServiceInterests extends ServiceFirestore<Interest>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    private static validateIcon(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = control.value;

            return url != null ? null : { iconUrlInvalid: true };
        };

        return validator;
    }

    public formCreate(interest: Interest): FormGroup
    {
        return super.formCreate
        ({
            ...interest,

            name        : [interest.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [interest.description, [Validators.required, ValidatorsExtended.minLength(1)]],

            tagline    : [interest.tagline,    [Validators.required, ValidatorsExtended.minLength(1)]],

            metadata : this.formBuilder.group
            ({
                image : [interest.metadata.image, [Validators.required]]
            })
        });
    }
}
