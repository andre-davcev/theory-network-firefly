import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

export enum PagesAssets
{
    Icons    = '/assets/icons',
    Images   = '/assets/images',
    Coupons  = '/assets/coupons',
    Beacons  = '/assets/beacons',
    Places   = '/assets/places',
    Events   = '/assets/events',
    Clusters = '/assets/clusters'
}

@Component
({
    selector    : 'app-page-publisher-assets',
    templateUrl : 'publisher-assets.page.html',
    styleUrls   : ['./publisher-assets.page.scss']
})

export class PagePublisherAssets
{
    public PagesAssets: any = PagesAssets;

    constructor(private nav: NavController) { }

    public go(page: PagesAssets): void
    {
        this.nav.navigateForward([page]);
    }
}
