import { FormNgxs } from '@theory/ngxs';
import { UntypedFormGroup } from '@angular/forms';

export interface StateAssetModel<T>
{
    empty     : T;
    form      : FormNgxs;
    formGroup : UntypedFormGroup;
    formPath  : string;
}
