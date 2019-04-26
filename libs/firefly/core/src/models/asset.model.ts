import { Model } from '@theory/firebase';

import { AssetKey } from './asset.model.key';

export interface Asset extends Model
{
    [AssetKey.Name]        : string;
    [AssetKey.Description] : string;
    [AssetKey.Private]     : boolean;
    [AssetKey.UserId]?     : string;
    [AssetKey.Draft]?      : boolean;
}
