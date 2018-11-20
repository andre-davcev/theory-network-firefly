import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { StateCluster } from '@firefly/core';

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
