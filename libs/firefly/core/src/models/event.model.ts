import { Asset } from './asset.model';

export interface Event extends Asset
{
    clusters: Array<string>;
    tagline: string;
    iconId: string;
    imageId: string;
}
