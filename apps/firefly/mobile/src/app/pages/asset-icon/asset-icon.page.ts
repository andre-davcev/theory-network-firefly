import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateIcon } from '@firefly/core';

@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'assets-icon.page.html',
    styleUrls   : ['./assets-icon.page.scss']
})

export class PageAssetIcon
{
    @Select(StateIcon.formGroup) form$: Observable<FormGroup>;

    constructor(private store: Store)
    {

    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }
}
