import { Cluster } from './cluster.model';

export interface Subscription extends Cluster
{
    subscribed : boolean;
    icon: string;
    photo: string;
}
