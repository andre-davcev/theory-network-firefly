import {Component, AfterViewInit} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import { FormGroup } from '@angular/forms';
import { StateCluster } from '../../state/cluster/cluster.state';
import { Observable } from 'rxjs/Observable';
import { Select, Store } from '@ngxs/store';

@IonicPage()
@Component
({
    selector    : 'app-page-cluster-categories',
    templateUrl : 'cluster-categories.page.html'
})

export class PagePublisherClusterCategories
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    constructor(private store: Store)
    {

    }
}
