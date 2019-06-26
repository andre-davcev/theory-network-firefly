import { Asset } from '../asset';
import { ClusterKey } from './cluster.model.key';

export interface Cluster extends Asset
{
    [ClusterKey.Tagline]:     string;
    [ClusterKey.IconId]:      string;
    [ClusterKey.Events]:      Record<string, string>;
    [ClusterKey.Subscribers]: Record<string, string>;
}
