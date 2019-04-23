import { FormGroup } from '@angular/forms';

import { Event } from '@firefly/core/models';

export interface StateEventModel
{
    form     : FormGroup;
    entities : Record<string, Event>;
    empty    : Event;
    imageUrl : string;
}
