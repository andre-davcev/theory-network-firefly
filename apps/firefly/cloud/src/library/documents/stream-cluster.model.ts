import { Cluster } from './cluster.model';
import { StreamClusterPartial, SubscriptionPartial } from '../models';

export type StreamCluster = Cluster & StreamClusterPartial & SubscriptionPartial;
