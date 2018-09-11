import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '../../constants/capacitor.const';

@Component
({
    selector    : 'app-page-assets-icons',
    templateUrl : 'assets-icons.page.html',
    styleUrls   : ['./assets-icons.page.scss']
})

export class PageAssetsIcons
{
    public icons: Array<string> =
    [
        'assets/icons/temp-coffee-icon-blue.png',
        'assets/icons/temp-coffee-icon-pink.png',
        'assets/icons/temp-coffee-icon-brown.png'
    ];

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }
}
