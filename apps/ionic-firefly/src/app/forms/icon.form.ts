import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsExtended } from '@theory/core';

import { Icon } from '../models/icon.model';

@Injectable({providedIn: 'root'})
export class FormIcon
{
    constructor(private formBuilder: FormBuilder) { }

    public build(icon?: Icon): FormGroup
    {
        return this.buildFrom(icon == null ? this.empty() : icon);
    }

    private empty(): Icon
    {
        return {
          draft       : true,
          name        : null,
          description : null,
          url         : null,
          private     : true
        };
    }

    private buildFrom(icon: Icon): FormGroup
    {
        const formGroup: FormGroup = this.formBuilder.group
        ({
            draft       : icon.draft,
            name        : [icon.name,        ValidatorsExtended.minLength(1)],
            description : [icon.description, ValidatorsExtended.minLength(1)],
            private     : icon.private,
            url         : [icon.url,        Validators.required]
        });

        return formGroup;
    }
}
