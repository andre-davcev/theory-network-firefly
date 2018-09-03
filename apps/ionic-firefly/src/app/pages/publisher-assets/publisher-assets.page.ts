import { Component } from '@angular/core';
import { Router } from '@angular/router';

export enum PagesAssets
{
    Icons    = '/publisher/assets/icons',
    Images   = '/publisher/assets/images',
    Coupons  = '/publisher/assets/coupons',
    Beacons  = '/publisher/assets/beacons',
    Places   = '/publisher/assets/places',
    Events   = '/publisher/assets/events',
    Clusters = '/publisher/assets/clusters'
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

    constructor(private router: Router) { }

    public go(page: PagesAssets): void
    {
        this.router.navigate([page]);
    }
}
