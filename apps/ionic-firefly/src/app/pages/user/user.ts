import {Component} from '@angular/core';

import {IonicPage, ViewController, NavController, ActionSheetController, ActionSheet} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@IonicPage()
@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.html'
})

export class PageUser
{
    public segment:string = 'assets';

    constructor(private nav: NavController, private actionSheetController: ActionSheetController, private translate: TranslateService, private statusBar: StatusBar, private viewController: ViewController)
    {

    }

    ionViewWillEnter()
    {
        this.statusBar.styleLightContent();
    }

    public add()
    {
        const segment:string = this.segment.substring(0, this.segment.length - 1);

        if (segment === 'assets')
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

        subscribe((translations: Array<string>) =>
        {
            const actionSheet: ActionSheet = this.actionSheetController.create
            ({
                title                 : translations['page.assets.add'],
                enableBackdropDismiss : true,

                buttons:
                [
                    {text: translations['page.assets.icon'],   handler: () => {}},
                    {text: translations['page.assets.image'],  handler: () => {}},
/*
                    {text: translations['page.assets.coupon'], handler: () => {}},
                    {text: translations['page.assets.beacon'], handler: () => {}},
*/
                    {text: translations['page.assets.place'],   handler: () => {}},
                    {text: translations['page.assets.event'],   handler: () => {}},
                    {text: translations['page.assets.cluster'], handler: () => {}},

                    {text: translations['general.cancel'], role: 'cancel'}
                ]
            });

            actionSheet.present();
        });

    }

    public dismissModal(): void
    {
        this.viewController.dismiss();
        this.statusBar.styleDefault();
    }
}
