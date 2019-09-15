import { FormNgxs } from '@theory/state';
import { FormGroup } from '@angular/forms';

export interface StateAssetModel<T>
{
    empty     : T;
    form      : FormNgxs;
    formGroup : FormGroup;
    formPath  : string;
}
