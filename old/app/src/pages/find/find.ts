import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

import {Store} from '@ngxs/store';
import { Cluster } from '../../models/cluster';
import { SetCluster } from '../../ngxs/cluster/cluster.state';

@IonicPage()
@Component
({
    selector    : 'app-page-find',
    templateUrl : 'find.html'
})

export class PageFind extends Page
{
    public segment:string = 'stream';

    constructor(private store:Store)
    {
        super();

          const cluster:Cluster = {
                        userId      : 'testUser',
                        name        : 'My First Cluster',
                        description : 'My description'
                    };

                    this.store.dispatch(new SetCluster(cluster));
    }
}