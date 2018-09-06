import { Component } from '@angular/core';

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
        'temp/icons/coffee-icon-blue.png',
        'temp/icons/coffee-icon-pink.png',
        'temp/icons/coffee-icon-brown.png'
    ];

    ionViewWillEnter()
    {
//        this.statusBar.styleBlackTranslucent();
    }
}
