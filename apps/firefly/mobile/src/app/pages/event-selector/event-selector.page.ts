import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '@firefly/mobile';


@Component
({
    selector    : 'app-page-event-selector',
    templateUrl : 'event-selector.page.html',
    styleUrls   : ['./event-selector.page.scss']
})

export class PageEventSelector
{
    public Pages: any = Pages;
    public segment: Pages = Pages.EventAssets;
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
