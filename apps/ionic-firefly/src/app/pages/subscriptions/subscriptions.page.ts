import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html',
    styleUrls   : ['./subscriptions.page.scss']
})

export class PageSubscriptions
{
    constructor(private modalController: ModalController)
    {

    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    public dismiss(): void
    {
        this.modalController.dismiss();
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
}
