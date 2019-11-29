import { Asset } from './asset.model';

export interface Image extends Asset
{
    bucketPath : string;
    mediaType  : string;
}
