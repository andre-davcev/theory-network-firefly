import { Cluster } from './cluster.model';

export interface Stream extends Cluster
{
    subscribed: boolean;
}
