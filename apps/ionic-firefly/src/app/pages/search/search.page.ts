import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch
{
    constructor(private statusBar: StatusBar, private viewController: ViewController)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }

    public dismissModal(): void
    {
        this.viewController.dismiss();
    }
}
