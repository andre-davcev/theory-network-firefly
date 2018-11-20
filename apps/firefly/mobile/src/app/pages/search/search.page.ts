import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch
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
        StatusBar.setStyle({style: StatusBarStyle.Light});
        this.modalController.dismiss();
    }
}
