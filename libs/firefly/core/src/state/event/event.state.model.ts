import { FormGroup } from '@angular/forms';

import { Event } from '@firefly/core/models';

export interface StateEventModel
{
    form               : FormGroup;
    empty              : Event;
    imageUrl           : string;
    imageUrlNormalized : string;
}
