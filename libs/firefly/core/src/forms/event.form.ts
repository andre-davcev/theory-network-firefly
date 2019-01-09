
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsExtended, FormGenerator } from '@theory/core';
import { Event } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class FormEvent extends FormGenerator<Event>
{
    constructor(private formBuilder: FormBuilder)
    {
        super();
    }

    protected empty(): Event
    {
        return {
          draft       : true,
          name        : null,
          tagline     : null,
          description : null,
          private     : true,
          clusters    : [],
          iconId      : undefined,
          imageId     : undefined
        };
    }

    public buildFrom(event: Event): FormGroup
    {
        const formGroup: FormGroup = this.formBuilder.group
        ({
            draft       : event.draft,
            name        : [event.name,        ValidatorsExtended.minLength(1)],
            tagline     : [event.tagline,     ValidatorsExtended.minLength(1)],
            description : [event.description, ValidatorsExtended.minLength(1)],
            iconId      : [event.iconId,      Validators.required],
            imageId     : [event.imageId,     Validators.required],
            private     : event.private,
            clusters    : this.formBuilder.array(event.clusters, Validators.minLength(1))
        });

        return formGroup;
    }

    public addEvent(formGroup: FormGroup): void
    {

    }
}
