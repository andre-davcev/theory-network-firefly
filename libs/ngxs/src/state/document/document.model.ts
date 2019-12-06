import { FormGroup } from '@angular/forms';
import { firestore } from 'firebase/app';

import { FormNgxs } from '../../interfaces';

export interface StateDocumentModel
{
    form      : FormNgxs;
    formGroup : FormGroup;
    snapshot  : firestore.DocumentSnapshot;
}
