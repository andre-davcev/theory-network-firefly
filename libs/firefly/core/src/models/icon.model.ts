import { Asset } from './asset.model';

export interface Icon extends Asset
{
    bucketPath : string;
    mediaType  : string;
    url?       : string;
    iconId:          string;
    iconUrlSmall?  : string;
}
