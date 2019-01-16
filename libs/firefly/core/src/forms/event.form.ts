
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsExtended, FormGenerator } from '@theory/core';
import { Event } from '@firefly/core/models';
import { AssetKey, EventKey } from '../enums';

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
          [AssetKey.Draft]       : true,
          [AssetKey.Name]        : null,
          [AssetKey.Description] : null,
          [AssetKey.Private]     : true,

          [EventKey.Tagline]  : null,
          [EventKey.ImageId]  : undefined,
          [EventKey.PlaceId]  : undefined,
          [EventKey.Clusters] : []
        };
    }

    public buildFrom(event: Event): FormGroup
    {
        const formGroup: FormGroup = this.formBuilder.group
        ({
            [AssetKey.Draft]       : event.draft,
            [AssetKey.Name]        : [event.name,        ValidatorsExtended.minLength(1)],
            [AssetKey.Description] : [event.description, ValidatorsExtended.minLength(1)],
            [AssetKey.Private]     : event.private,

            [EventKey.Tagline]  : [event.tagline, ValidatorsExtended.minLength(1)],
            [EventKey.ImageId]  : [event.imageId, Validators.required],
            [EventKey.PlaceId]  : [event.placeId, Validators.required],
            [EventKey.Clusters] : this.formBuilder.array(event.clusters, Validators.minLength(1))
        });

        return formGroup;
    }

    public addEvent(formGroup: FormGroup): void
    {

    }
}
