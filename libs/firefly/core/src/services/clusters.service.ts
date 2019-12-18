import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Cluster } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { ValidatorsExtended } from '@theory/core';


@Injectable({ providedIn: 'root' })
export class ServiceClusters extends ServiceFirestore<Cluster>
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

    public formCreate(cluster: Cluster): FormGroup
    {
        return super.formCreate
        ({
            ...cluster,

            name        : [cluster.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [cluster.description, [Validators.required, ValidatorsExtended.minLength(1)]],

            tagline    : [cluster.tagline,    [Validators.required, ValidatorsExtended.minLength(1)]],
            bucketPath : [cluster.bucketPath, [ServiceClusters.validateIcon()]]
        });
    }
}
