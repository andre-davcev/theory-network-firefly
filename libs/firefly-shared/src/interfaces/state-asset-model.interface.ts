import { UntypedFormGroup } from '@angular/forms';

import { FormNgxs } from '@theory/ngxs';

export interface StateAssetModel<T> {
  empty: T;
  form: FormNgxs;
  formGroup: UntypedFormGroup;
  formPath: string;
}
