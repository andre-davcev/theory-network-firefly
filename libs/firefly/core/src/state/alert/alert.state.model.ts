import { FormGroup } from '@angular/forms';

import { FormNgxs } from '@theory/state';
import { Alert } from '@firefly/core/models';

export interface StateAlertModel
{
    empty     : Alert;
    form      : FormNgxs;
    formGroup : FormGroup;
}
