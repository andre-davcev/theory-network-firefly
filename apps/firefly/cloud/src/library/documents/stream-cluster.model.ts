import { Cluster } from './cluster.model';
import { MetadataStreamCluster } from '../models';

export interface StreamCluster extends Cluster
{
    score: number;

    metadata?: MetadataStreamCluster;
}
