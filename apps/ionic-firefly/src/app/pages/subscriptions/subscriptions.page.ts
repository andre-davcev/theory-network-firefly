import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '../../constants/capacitor.const';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html',
    styleUrls   : ['./subscriptions.page.scss']
})

export class PageSubscriptions
{
    constructor()
    {

    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }
}
