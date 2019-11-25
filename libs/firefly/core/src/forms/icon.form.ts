import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsExtended, FormGenerator } from '@theory/core';

import { Icon } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class FormIcon extends FormGenerator<Icon>
{
    constructor(private formBuilder: FormBuilder)
    {
        super();
    }

    protected empty(): Icon
    {
        return {
          draft       : true,
          name        : null,
          description : null,
          private     : true,
          mediaType   : null,
          iconId          : null,
          bucketPath  : null
        };
    }

    protected buildFrom(icon: Icon): FormGroup
    {
        const formGroup: FormGroup = this.formBuilder.group
        ({
            draft       : icon.draft,
            name        : [icon.name,        ValidatorsExtended.minLength(1)],
            description : [icon.description, ValidatorsExtended.minLength(1)],
            private     : icon.private
        });

        return formGroup;
    }
}
