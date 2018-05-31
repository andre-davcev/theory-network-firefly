import {Component} from '@angular/core';

import {IonicPage, ActionSheetController, ActionSheet, NavController} from 'ionic-angular';

export enum PagesAssets
{
    Icons   = 'PageAssetsIcons',
    Images  = 'PageAssetsImages',
    Coupons = 'PageAssetsCoupons',
    Beacons = 'PageAssetsBeacons',
    Places  = 'PageAssetsPlaces',
    Events  = 'PageAssetsEvents'
}

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-assets',
    templateUrl : 'publisher-assets.html'
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
