import { Icon } from '@firefly/core/models';
import { StateAssetModel, Upload } from '@firefly/core/interfaces';

export interface StateIconModel extends StateAssetModel<Icon>
{
    upload: Upload;
}
