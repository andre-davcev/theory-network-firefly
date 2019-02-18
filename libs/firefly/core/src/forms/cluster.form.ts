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
          icon        : null,
          photo       : null,
          categories  : '',
          private     : true,
          locations   : []
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
            icon        : [cluster.icon],
            photo       : [cluster.photo],
            categories  : [cluster.categories],
            private     : cluster.private,
            locations   : this.formBuilder.array(cluster.locations)
        });

        return formGroup;
    }

    public addLocation(formGroup: FormGroup): void
    {

    }
}
