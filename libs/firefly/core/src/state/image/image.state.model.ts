import { StateAssetModel } from '@firefly/core/interfaces';
import { Image } from '@firefly/core/models';

export interface StateImageModel extends StateAssetModel<Image>
{
    uploadProgress: number;
    uploadError:    string;
}
