import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Select, Store } from '@ngxs/store';

import { Pages } from '../pages.enum';
import { StateUserIcons, Icon } from '@firefly/core';

@Component
({
    selector    : 'app-page-assets-icons',
    templateUrl : 'assets-icons.page.html',
    styleUrls   : ['./assets-icons.page.scss']
})

export class PageAssetsIcons
{
    @Select(StateUserIcons.list) icons$: Observable<Array<Icon>>;
    /*public icons: Array<string> =
    [
        'assets/icons/temp-coffee-icon-blue.png',
        'assets/icons/temp-coffee-icon-pink.png',
        'assets/icons/temp-coffee-icon-brown.png'
    ];*/

    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    navigate(): void{
      this.store.dispatch(new Navigate([Pages.AssetIcon]));
    }
}
