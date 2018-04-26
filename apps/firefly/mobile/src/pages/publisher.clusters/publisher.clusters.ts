import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Cluster} from '../../models/cluster';
import {Temp}    from '../../services/temp';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher.clusters.html'
})

export class PagePublisherClusters
{
    public clusters:Array<Cluster>;

    constructor(temp:Temp)
    {
        this.clusters = temp.subscriptions;

        console.log(this.clusters);
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
