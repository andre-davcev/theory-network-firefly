import { Event } from '@firefly/core/models';
import { FormNgxs } from '@theory/core';
import { FormGroup } from '@angular/forms';

export interface StateEventModel
{
    empty     : Event;
    form      : FormNgxs;
    formGroup : FormGroup;
    clusters  : Record<string, Event>;
    imageUrl  : string;
}
