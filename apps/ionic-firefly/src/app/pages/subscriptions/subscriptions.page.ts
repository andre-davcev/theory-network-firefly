import { Component } from '@angular/core';

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
//        this.statusBar.styleLightContent();
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
//        this.statusBar.styleDefault();
    }
}
