import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateEvent } from '@firefly/core';

@Component
({
    selector    : 'app-page-event-location',
    templateUrl : 'event-location.page.html',
    styleUrls   : ['./event-location.page.scss']
})

export class PageEventLocation
{
    @Select(StateEvent.form) form$: Observable<FormGroup>;

    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }
}
