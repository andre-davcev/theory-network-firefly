import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';
import { from, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PagesAssets } from '../publisher-assets';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser implements OnInit
{
    public segment: string = 'assets';
    public translations: Array<string> = [];

    constructor
    (
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private nav: NavController,
        private translate: TranslateService,
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
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }

    public dismiss(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
        this.modalController.dismiss();
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
                    handler : () => {this.nav.navigateForward([PagesAssets.Clusters]);}
                },
                {
                    text    : this.translations['page.assets.event'],
                    icon    : 'calendar',
                    handler : () => {this.nav.navigateForward([PagesAssets.Events]);}
                },
                {
                    text    : this.translations['page.assets.place'],
                    icon    : 'pin',
                    handler : () => {this.nav.navigateForward([PagesAssets.Places]);}
                },
                {
                    text    : this.translations['page.assets.icon'],
                    icon    : 'contact',
                    handler : () => {this.nav.navigateForward([PagesAssets.Icons]);}
                },
                {
                    text    : this.translations['page.assets.image'],
                    icon    : 'images',
                    handler : () => {this.nav.navigateForward([PagesAssets.Clusters]);}
                },
/*
                {
                    text    : this.translations['page.assets.coupon'],
                    icon    : 'pricetags',
                    handler : () => {this.nav.navigateForward([PagesAssets.Coupons]);}
                },
                {
                    text    : this.translations['page.assets.beacon'],
                    icon    : 'bluetooth',
                    handler : () => {this.nav.navigateForward([PagesAssets.Beacons]);}
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
