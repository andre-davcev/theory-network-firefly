import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { StateCluster } from '../../state/cluster/cluster.state';

@Component
({
    selector    : 'app-page-cluster-categories',
    templateUrl : 'cluster-categories.page.html',
    styleUrls   : ['./cluster-categories.page.scss']
})

export class PagePublisherClusterCategories
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;
}
