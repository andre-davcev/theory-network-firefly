import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';

import {Cluster} from '../../models/cluster';
import {Temp}    from '../../services/temp';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-clusters',
    templateUrl : 'publisher.clusters.html'
})

export class PagePublisherClusters
{
    public clusters:Array<Cluster>;

    constructor(private nav: NavController, private statusBar: StatusBar, temp:Temp)
    {
        this.clusters = temp.subscriptions;

        console.log(this.clusters);
    }

    ionViewWillEnter()
    {
        this.statusBar.styleLightContent();
    }

    public clicked(cluster: Cluster)
    {
        console.log(cluster);
    }

    public deleted(cluster: Cluster)
    {
        console.log(cluster);
    }

    public add(): void
    {
        this.nav.push('PagePublisherCluster');
    }
}
