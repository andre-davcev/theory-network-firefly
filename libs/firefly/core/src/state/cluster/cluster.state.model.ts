import { FormGroup } from '@angular/forms';

import { Cluster } from '@firefly/core/models';

export interface StateClusterModel
{
    //id       : string;
    form     : FormGroup;
    empty    : Cluster;
    entities : Record<string, Cluster>;
    iconUrl  : string;
    iconUrlNormalized: string;
}
