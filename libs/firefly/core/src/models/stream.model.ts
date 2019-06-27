import { Cluster } from './cluster.model';

export interface Stream extends Cluster
{
    [StreamKey.Index]:           number;
    [StreamKey.Subscribed]:      boolean;
    [StreamKey.SubscribedCount]: number;
}
