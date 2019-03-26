import { Component, Input } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '../pages.enum';
import { ActionEventSetImageIndex } from '@firefly/core';

@Component
({
    selector    : 'app-page-image-selector',
    templateUrl : 'image-selector.page.html',
    styleUrls   : ['./image-selector.page.scss']
})

export class PageImageSelector
{
    public Pages: any = Pages;
    public segment: Pages = Pages.ImageCatalog;
    public translations: Array<string> = [];

    constructor(private store: Store, private modalController: ModalController) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }

    public cancel(): void
    {
        this.modalController.dismiss();
    }

    public selectLibraryImage(index: number): void
    {
        console.log('IN HERE');
        this.store.dispatch(new ActionEventSetImageIndex(index));

        this.modalController.dismiss();
    }
}
