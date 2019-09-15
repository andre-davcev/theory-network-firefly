import { Icon } from '@firefly/core/models';
import { StateAssetModel } from '@firefly/core/interfaces';

export interface StateIconModel extends StateAssetModel<Icon>
{
    url: string;
}
