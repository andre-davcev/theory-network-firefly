import { Event, Cluster } from '@firefly/core/models';
import { FormNgxs } from '@theory/core';
import { FormGroup } from '@angular/forms';

export interface StateEventModel
{
    form               : FormNgxs;
    formGroup          : FormGroup;
    empty              : Event;
    imageUrl           : string;
    imageUrlNormalized : string;
    clusterPrimary     : Cluster;
}
