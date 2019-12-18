import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Icon } from '@firefly/cloud';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ServiceFirestore } from '@theory/firebase';
import { CoreEnum, ValidatorsExtended } from '@theory/core';

@Injectable({ providedIn: 'root' })
export class ServiceIcons extends ServiceFirestore<Icon>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    public addMetadata(entity: Icon, collection: string, dataUri: string): Icon
    {
        const start: number = dataUri.indexOf('/') + 1;
        const end:   number = dataUri.indexOf(';');

        entity.id         = entity.id === CoreEnum.IdNew ? this.firestore.createId() : entity.id;
        entity.mediaType  = dataUri.substring(start, end);
        entity.bucketPath = `${entity.userId}/${collection}/${entity.id}.${entity.mediaType}`;

        return entity;
    }

    private static validateIcon(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            /*const url: string = control.value;

            return url != null ? null : { iconUrlInvalid: true };*/

            return null;
        };

        return validator;
    }

    public formCreate(icon: Icon): FormGroup
    {
        return super.formCreate
        ({
            ...icon,

            name        : [icon.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            //bucketPath : [icon.bucketPath, [ServiceIcons.validateIcon()]]
        });
    }
}
