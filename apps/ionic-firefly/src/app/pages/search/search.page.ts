import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '../../constants/capacitor.const';

@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch
{
    constructor()
    {

    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
    }
}
