import { FormGroup } from '@angular/forms';

import { Model } from '@theory/firebase';
import { FormNgxs } from './form-ngxs.interface';
import { firestore } from 'firebase/app';

export interface StateDocumentModel<T extends Model>
{
    form      : FormNgxs;
    formGroup : FormGroup;
    snapshot  : firestore.DocumentSnapshot;
}
