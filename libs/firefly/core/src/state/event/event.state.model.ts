import { Event, EventClusters } from '@firefly/core/models';
import { FormNgxs } from '@theory/core';
import { FormGroup } from '@angular/forms';

export interface StateEventModel
{
    empty     : Event;
    form      : FormNgxs;
    formGroup : FormGroup;
    clusters  : EventClusters;
    imageUrl  : string;
}
