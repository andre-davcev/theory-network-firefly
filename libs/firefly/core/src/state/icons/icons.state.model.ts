import { FormGroup } from '@angular/forms';

import { Icon } from '@firefly/core';

export interface StateIconsModel
{
    id       : string;
    form     : FormGroup;
    entities : Record<string, Icon>;
}
