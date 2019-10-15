import { Asset } from './asset.model';

export interface Cluster extends Asset
{
    tagline:         string;
    iconId:          string;
    iconUrl?:        string;
    eventCount:      number;
    subscriberCount: number;
}
