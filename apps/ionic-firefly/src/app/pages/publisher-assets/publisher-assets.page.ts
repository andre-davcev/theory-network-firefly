import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

export enum PagesAssets
{
    Icons    = 'PageAssetsIcons',
    Images   = 'PageAssetsImages',
    Coupons  = 'PageAssetsCoupons',
    Beacons  = 'PageAssetsBeacons',
    Places   = 'PageAssetsPlaces',
    Events   = 'PageAssetsEvents',
    Clusters = 'PagePublisherClusters'
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

    constructor(private nav: NavController)
    {

    }

    public go(page: PagesAssets): void
    {
        this.nav.push(page);
    }
}
