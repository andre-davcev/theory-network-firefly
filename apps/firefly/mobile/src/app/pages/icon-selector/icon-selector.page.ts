import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-icon-selector',
    templateUrl : 'icon-selector.page.html',
    styleUrls   : ['./icon-selector.page.scss']
})

export class PageIconSelector
{
    public Pages: any = Pages;
    public segment: Pages = Pages.ImageCatalog;
    public translations: Array<string> = [];

    constructor(private store: Store) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }
}
