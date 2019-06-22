import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsExtended, FormGenerator } from '@theory/core';
import { Cluster } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class FormCluster extends FormGenerator<Cluster>
{
    constructor(private formBuilder: FormBuilder)
    {
        super();
    }

    protected empty(): Cluster
    {
        return {
          draft       : true,
          name        : null,
          tagline     : null,
          description : null,
          iconId      : null,
          private     : true,
          events      : {},
          subscribers : {}
        };
    }

    public buildFrom(cluster: Cluster): FormGroup
    {
        const formGroup: FormGroup = this.formBuilder.group
        ({
            draft       : cluster.draft,
            name        : [cluster.name,        [Validators.required, ValidatorsExtended.minLength(3)]],
            tagline     : [cluster.tagline,     [Validators.required, ValidatorsExtended.minLength(3)]],
            description : [cluster.description, [Validators.required, ValidatorsExtended.minLength(3)]],
            iconId      : [cluster.iconId],
            private     : cluster.private,
            events      : [cluster.events,      [Validators.required, ValidatorsExtended.minLength(1)]]
        });

        return formGroup;
    }

    public addLocation(formGroup: FormGroup): void
    {

    }
}
