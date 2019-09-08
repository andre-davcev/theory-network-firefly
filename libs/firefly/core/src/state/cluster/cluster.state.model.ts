import { FormGroup } from '@angular/forms';
import { FormNgxs } from '@theory/state';
import { Cluster } from '@firefly/core/models';

export interface StateClusterModel
{
    form      : FormNgxs;
    formGroup : FormGroup
    empty     : Cluster;
    entities  : Record<string, Cluster>;
    iconUrl   : string;
    iconUrlNormalized: string;
}
