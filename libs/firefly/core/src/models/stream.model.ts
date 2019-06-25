import { Cluster } from './cluster.model';
import { StreamKey } from './stream.model.key';

export interface Stream extends Cluster
{
    [StreamKey.Index]:           number;
    [StreamKey.Subscribed]:      boolean;
    [StreamKey.SubscribedCount]: number;
}
