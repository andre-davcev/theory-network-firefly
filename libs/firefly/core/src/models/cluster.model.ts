import { Asset } from './asset.model';

export interface Cluster extends Asset
{
    tagline:         string;
    imageId:         string;
    imageUrl?:       string;
    eventCount:      number;
    subscriberCount: number;
}
