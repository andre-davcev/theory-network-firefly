import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-assets',
    templateUrl : 'assets.page.html',
    styleUrls   : ['./assets.page.scss']
})

export class PageAssets implements OnInit
{
    public Pages: any = Pages;
    public translations: Array<string> = [];

    constructor
    (
        private actionSheetController: ActionSheetController,
        private nav: NavController,
        private translate: TranslateService,
        private store: Store
    ) { }

    ngOnInit(): void
    {
        this.translate.get
        ([
            'page.assets.add',
            'page.assets.icon',
            'page.assets.image',
            'page.assets.coupon',
            'page.assets.beacon',
            'page.assets.place',
            'page.assets.event',
            'page.assets.cluster',
            'general.cancel'
        ]).
        subscribe((translations: Array<string>) => this.translations = translations);
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public go(page: Pages): void
    {
        this.nav.navigateForward([page])
    }


    public add(): void
    {
        const actionSheet$: Observable<HTMLIonActionSheetElement> = from(this.actionSheetController.create
        ({
            header : this.translations['page.assets.add'],

            buttons :
            [
                {
                    text    : this.translations['page.assets.cluster'],
                    icon    : 'bug',
                    handler : () => {this.nav.navigateForward([Pages.Clusters]);}
                },
                {
                    text    : this.translations['page.assets.event'],
                    icon    : 'calendar',
                    handler : () => {this.nav.navigateForward([Pages.Events]);}
                },
                {
                    text    : this.translations['page.assets.place'],
                    icon    : 'pin',
                    handler : () => {this.nav.navigateForward([Pages.Places]);}
                },
                {
                    text    : this.translations['page.assets.icon'],
                    icon    : 'contact',
                    handler : () => {this.nav.navigateForward([Pages.Icons]);}
                },
                {
                    text    : this.translations['page.assets.image'],
                    icon    : 'images',
                    handler : () => {this.nav.navigateForward([Pages.Clusters]);}
                },
/*
                {
                    text    : this.translations['page.assets.coupon'],
                    icon    : 'pricetags',
                    handler : () => {this.nav.navigateForward([Pages.Coupons]);}
                },
                {
                    text    : this.translations['page.assets.beacon'],
                    icon    : 'bluetooth',
                    handler : () => {this.nav.navigateForward([Pages.Beacons]);}
                },
*/
                {
                    text    : 'Cancel',
                    role    : 'cancel'
                }
            ]
        }));

        actionSheet$.subscribe((actionSheet: HTMLIonActionSheetElement) => actionSheet.present());
    }
}

