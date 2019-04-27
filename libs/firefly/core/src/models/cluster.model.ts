import { Asset } from './asset.model';
import { ClusterKey } from './cluster.model.key';

export interface Cluster extends Asset
{
    [ClusterKey.Tagline]: string;
    [ClusterKey.IconId]:  string;
    [ClusterKey.Events]:  Array<string>;
}
