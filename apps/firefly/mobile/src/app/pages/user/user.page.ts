import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser
{
    public segment: string = 'assets';

    constructor(private modalController: ModalController) { }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }

    public dismiss(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
        this.modalController.dismiss();
    }
}
