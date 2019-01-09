import { Asset } from './asset.model';

export interface Event extends Asset
{
    clusters: Record<string,string>;
    tagline: string;
    iconId: string;
    imageId: string;
}
