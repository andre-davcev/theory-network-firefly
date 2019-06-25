import { Cluster } from '@firefly/core/models';

export interface StateUserStreamModel
{
    watching: boolean;
    loading:  boolean;
    data:     Array<string>;
    clusters: Array<Cluster>;
    pageSize: number;
    page:     number;
    paging:   boolean;
}
