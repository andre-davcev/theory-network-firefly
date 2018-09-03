import { Component } from '@angular/core';

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
//        this.statusBar.styleDefault();
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
    }
}
