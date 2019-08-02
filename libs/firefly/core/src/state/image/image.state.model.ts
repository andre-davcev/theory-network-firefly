import { Upload } from '@firefly/core/interfaces';
import { Image } from '@firefly/core/models';
import { FormNgxs } from '@theory/core/interfaces';
import { FormGroup } from '@angular/forms';

export interface StateImageModel
{
    empty     : Image;
    form      : FormNgxs;
    formGroup : FormGroup;
    url       : string;

    upload : Upload;
}
