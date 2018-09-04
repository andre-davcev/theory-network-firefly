import { Component } from '@angular/core';

import { Cluster } from '../../models/cluster.model';
import { Temp } from '../../services/temp.service';

@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher-clusters.page.html',
    styleUrls   : ['./publisher-clusters.page.scss']
})

export class PagePublisherClusters
{
    public clusters:Array<Cluster>;

    constructor(temp: Temp)
    {
        this.clusters = temp.subscriptions;
    }

    ionViewWillEnter()
    {
//        this.statusBar.styleLightContent();
    }

    public clicked(cluster: Cluster)
    {
        console.log(cluster);
    }

    public deleted(cluster: Cluster)
    {
        console.log(cluster);
    }
}
