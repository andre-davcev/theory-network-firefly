import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

import {Store} from '@ngxs/store';
import { Cluster } from '../../models/cluster';
import { SetCluster } from '../../state/cluster/cluster.actions';

@IonicPage()
@Component
({
    selector    : 'app-page-find',
    templateUrl : 'find.html'
})

export class PageFind
{
    public segment:string = 'stream';

    constructor(private store:Store)
    {
        const cluster: Cluster =
        {
            userId      : 'testUser',
            name        : 'My First Cluster',
            description : 'My description'
        };

        this.store.dispatch(new SetCluster(cluster));
    }
}
