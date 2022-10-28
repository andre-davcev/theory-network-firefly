import { DocumentSnapshot } from '@angular/fire/firestore';
import { UntypedFormGroup } from '@angular/forms';

import { FormNgxs } from '../../interfaces';

export interface StateDocumentModel
{
    form      : FormNgxs;
    formGroup : UntypedFormGroup;
    snapshot  : DocumentSnapshot;
}
