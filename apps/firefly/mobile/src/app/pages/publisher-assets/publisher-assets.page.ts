import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

export enum PagesAssets
{
    Icons    = 'icons',
    Images   = 'images',
    Coupons  = 'coupons',
    Beacons  = 'beacons',
    Places   = 'places',
    Events   = 'events',
    Clusters = 'clusters'
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
        this.router.navigate([`/home/settings/${page}`]);
    }
}
