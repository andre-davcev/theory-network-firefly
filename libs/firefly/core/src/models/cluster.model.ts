import { Asset } from './asset.model';

export interface Cluster extends Asset
{
    tagline:     string;
    iconId:      string;
    events:      Record<string, string>;
    subscribers: Record<string, string>;
}
