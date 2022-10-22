import { FormNgxs } from '@theory/ngxs';
import { FormGroup } from '@angular/forms';

export interface StateAssetModel<T>
{
    empty     : T;
    form      : FormNgxs;
    formGroup : FormGroup;
    formPath  : string;
}
