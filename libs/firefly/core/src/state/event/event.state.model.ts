import { Event } from '@firefly/core/models';
import { FormNgxs } from '@theory/state';
import { FormGroup } from '@angular/forms';

export interface StateEventModel
{
    empty     : Event;
    form      : FormNgxs;
    formGroup : FormGroup;
    clusters  : Record<string, Event>;
    imageUrl  : string;
}
