import {Component} from '@angular/core';

import {NavController, ActionSheet, ActionSheetController} from 'ionic-angular';
import {IonicPage}     from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.html'
})

export class PagePublisher
{
    public segment:string = 'clusters';

    constructor(private nav:NavController, private actionSheetController: ActionSheetController, private translate: TranslateService, private statusBar: StatusBar)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleLightContent();
    }

    public add()
    {
        const segment:string = this.segment.substring(0, this.segment.length - 1);

        if (segment === 'cluster')
        {
            const page:string = 'PagePublisher' + segment.charAt(0).toUpperCase() + segment.slice(1);

            this.nav.push(page);
        }
        else
        {
            this.presentActionSheet();
        }
    }

    public presentActionSheet()
    {
        this.translate.get
        ([
            'pages.assets.add',
            'pages.assets.icon',
            'pages.assets.image',
            'pages.assets.coupon',
            'pages.assets.beacon',
            'pages.assets.place',
            'pages.assets.event',
            'general.cancel'
        ]).

        subscribe((translations: Array<string>) =>
        {
            const actionSheet: ActionSheet = this.actionSheetController.create
            ({
                title                 : translations['pages.assets.add'],
                enableBackdropDismiss : true,

                buttons:
                [
                    {text: translations['pages.assets.icon'],   handler: () => {}},
                    {text: translations['pages.assets.image'],  handler: () => {}},
/*
                    {text: translations['pages.assets.coupon'], handler: () => {}},
                    {text: translations['pages.assets.beacon'], handler: () => {}},
*/
                    {text: translations['pages.assets.place'],  handler: () => {}},
                    {text: translations['pages.assets.event'],  handler: () => {}},
                    {text: translations['general.cancel'],      role: 'cancel'}
                ]
            });

            actionSheet.present();
        });
    }
}
