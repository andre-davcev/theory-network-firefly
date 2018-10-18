import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

import { StateIcons } from '../../state/icons/icons.state';
import { ActionSetIconId } from '../../state/icons/icons.actions';

@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'assets-icon.page.html',
    styleUrls   : ['./assets-icon.page.scss']
})

export class PageAssetsIcon
{
    @Select(StateIcons.form) form$: Observable<FormGroup>;

    constructor(private store: Store)
    {
        this.store.dispatch(new ActionSetIconId('new'));
    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
}
