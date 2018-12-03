import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.page.html',
    styleUrls   : ['./publisher.page.scss']
})

export class PagePublisher implements OnInit
{
    public  segment:string = 'clusters';
    private translations: Array<string> = [];

    constructor
    (
        private nav: NavController,
        private actionSheetController: ActionSheetController,
        private translate: TranslateService
    )
    { }

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
            'general.cancel'
        ]).
        subscribe((translations: Array<string>) => this.translations = translations);
    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Dark});
    }

    public add()
    {
        const segment:string = this.segment.substring(0, this.segment.length - 1);

        if (segment === 'cluster')
        {
            this.nav.navigateForward(['/publisher/' + segment]);
        }
        else
        {
            this.presentActionSheet();
        }
    }

    public presentActionSheet()
    {
        const translations: Array<string> = this.translations;

        from(this.actionSheetController.create
        ({
            header : translations['page.assets.add'],

            buttons:
            [
                {text: translations['page.assets.icon'],   handler: () => {}},
                {text: translations['page.assets.image'],  handler: () => {}},
/*
                {text: translations['page.assets.coupon'], handler: () => {}},
                {text: translations['page.assets.beacon'], handler: () => {}},
*/
                {text: translations['page.assets.place'],  handler: () => {}},
                {text: translations['page.assets.event'],  handler: () => {}},
                {text: translations['general.cancel'],      role: 'cancel'}
            ]
        })).
        pipe(tap((actionSheet: HTMLIonActionSheetElement) => actionSheet.present()));
    }

    public dismiss(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }
}
