import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Cluster} from '../../models/cluster';
import {Temp}    from '../../services/temp';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher.clusters.html'
})

export class PagePublisherClusters extends Page
{
    public clusters:Array<Cluster>;

    constructor(temp:Temp)
    {
        super();

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