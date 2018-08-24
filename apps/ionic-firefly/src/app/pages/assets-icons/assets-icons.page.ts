import {Component} from '@angular/core';

import {IonicPage, NavController} from 'ionic-angular';
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
        'temp/icons/coffee-icon-brown.png'
    ];

    constructor(private statusBar: StatusBar, private nav: NavController, )
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleBlackTranslucent();
    }

    add(): void
    {
        // ToDo: Why is this erroring?
        this.nav.push('PageAssetsIcon');
    }
}
