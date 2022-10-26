import { UntypedFormGroup } from '@angular/forms';
import { DocumentSnapshot } from '@theory/firebase';

import { FormNgxs } from '../../interfaces';

export interface StateDocumentModel
{
    form      : FormNgxs;
    formGroup : UntypedFormGroup;
    snapshot  : DocumentSnapshot;
}
