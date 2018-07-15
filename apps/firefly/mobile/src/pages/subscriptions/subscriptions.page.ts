import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

@Component
({
    selector    : 'app-page-subscriptions',
    templateUrl : 'subscriptions.page.html'
})

@IonicPage()
export class PageSubscriptions
{
    constructor(private statusBar: StatusBar, private viewController: ViewController)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleLightContent();
    }

    public dismissModal(): void
    {
        this.viewController.dismiss();
        this.statusBar.styleDefault();
    }
}
