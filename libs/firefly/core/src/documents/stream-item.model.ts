import { Cluster } from './cluster.model';

export interface StreamItem extends Cluster
{
    subscribed: boolean;
}
