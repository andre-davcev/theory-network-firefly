import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.html'
})

export class PageUser
{
    segment:string = 'profile';

    constructor(private statusBar: StatusBar)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleLightContent();
    }
}
