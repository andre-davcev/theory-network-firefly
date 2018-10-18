import { FormGroup } from '@angular/forms';

import { Cluster } from '@firefly/core';

export interface StateClusterModel
{
    id       : string;
    form     : FormGroup;
    entities : Record<string, Cluster>;
}
