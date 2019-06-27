import { Cluster } from './cluster.model';

export interface Stream extends Cluster
{
    index:           number;
    subscribed:      boolean;
    subscribedCount: number;
}
