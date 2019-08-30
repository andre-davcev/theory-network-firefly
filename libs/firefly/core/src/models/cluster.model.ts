import { Asset } from './asset.model';

export interface Cluster extends Asset
{
    tagline:         string;
    iconId:          string;
    eventCount:      number;
    subscriberCount: number;
}
