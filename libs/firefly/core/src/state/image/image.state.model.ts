import { Upload, StateAssetModel } from '@firefly/core/interfaces';
import { Image } from '@firefly/core/models';

export interface StateImageModel extends StateAssetModel<Image>
{
    upload: Upload;
}
