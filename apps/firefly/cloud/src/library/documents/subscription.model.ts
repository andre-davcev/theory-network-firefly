import { Cluster } from './cluster.model';

export interface Subscription extends Cluster
{
    on: boolean;
}
