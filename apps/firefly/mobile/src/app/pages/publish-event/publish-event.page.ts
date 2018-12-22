import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateCluster, ActionSetClusterId } from '@firefly/core';

@Component
({
    selector    : 'app-page-publish-event',
    templateUrl : 'publish-event.page.html',
    styleUrls   : ['./publish-event.page.scss']
})

export class PagePublishEvent
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    segment:string = 'clusters';

    constructor(private store: Store)
    {
        this.store.dispatch(new ActionSetClusterId('new'));
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }
}
