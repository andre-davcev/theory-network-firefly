import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'assets-icon.page.html'
})

export class PageAssetsIcon
{
//    @Select(StateCluster.form) form$: Observable<FormGroup>;

    constructor(private statusBar: StatusBar)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }
}
