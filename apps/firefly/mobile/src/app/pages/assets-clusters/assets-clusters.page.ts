import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store'
import { Cluster, StateCluster, ActionGetClusters } from '@firefly/core';
import { Observable } from 'rxjs';

@Component
({
    selector    : 'app-page-assets-clusters',
    templateUrl : 'assets-clusters.page.html',
    styleUrls   : ['./assets-clusters.page.scss']
})

export class PageAssetsClusters
{
  @Select(StateCluster.clusters) clusters$: Observable<Array<Cluster>>;

    constructor(private store: Store)
    {
    }

    add(): void
    {

    }

    ionViewWillEnter()
    {
      this.store.dispatch(new ActionGetClusters());
    }
}
