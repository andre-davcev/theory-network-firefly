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
            name        : [cluster.name,        ValidatorsExtended.minLength(1)],
            tagline     : [cluster.tagline,     ValidatorsExtended.minLength(1)],
            description : [cluster.description, ValidatorsExtended.minLength(1)],
            icon        : [cluster.icon,        Validators.required],
            photo       : [cluster.photo,       Validators.required],
            categories  : [cluster.categories,  Validators.minLength(1)],
            private     : cluster.private,
            locations   : this.formBuilder.array(cluster.locations, Validators.minLength(1))
        });

        return formGroup;
    }

    public addLocation(formGroup: FormGroup): void
    {

    }
}
