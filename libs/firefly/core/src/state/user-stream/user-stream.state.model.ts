import { Cluster, UserStream } from '@firefly/core/models';

export interface StateUserStreamModel
{
    watching: boolean;
    loading:  boolean;
    data:     UserStream;
    clusters: Array<Cluster>;
    pageSize: number;
    page:     number;
    paging:   boolean;
}
