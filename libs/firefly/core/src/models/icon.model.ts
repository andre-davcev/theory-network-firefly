import { Asset } from './asset.model';

export interface Icon extends Asset
{
    url?      : string;
    urlSmall? : string;
}
