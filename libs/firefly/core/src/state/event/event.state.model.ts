import { FormGroup } from '@angular/forms';

import { Event, Cluster } from '@firefly/core/models';
import { FormNgxs } from '@theory/core';

export interface StateEventModel
{
    form               : FormGroup;
    formNgxs           : FormNgxs;
    empty              : Event;
    imageUrl           : string;
    imageUrlNormalized : string;
    clusterPrimary     : Cluster;
}
