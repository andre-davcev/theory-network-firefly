import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component
({
    selector    : 'app-page-assets-icons',
    templateUrl : 'assets-icons.page.html'
})

export class PageAssetsIcons
{
    public icons: Array<string> =
    [
        'temp/icons/coffee-icon-blue.png',
        'temp/icons/coffee-icon-pink.png',
        'temp/icons/coffee-icon-brown.png',
        'temp/icons/coffee-icon-blue.png',
        'temp/icons/coffee-icon-pink.png'
    ];

    constructor(private statusBar: StatusBar)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }

    add(): void
    {

    }
}
