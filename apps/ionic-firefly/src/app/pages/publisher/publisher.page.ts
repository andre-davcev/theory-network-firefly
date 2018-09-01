import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ViewController } from '@ionic/core';

@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.page.html',
    styleUrls   : ['./publisher.page.scss']
})

export class PagePublisher
{
    public segment:string = 'clusters';

    constructor(private nav: NavController, private actionSheetController: ActionSheetController, private translate: TranslateService, private viewController: ViewController)
    {

    }

    ionViewWillEnter()
    {
//        this.statusBar.styleLightContent();
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
            'page.assets.add',
            'page.assets.icon',
            'page.assets.image',
            'page.assets.coupon',
            'page.assets.beacon',
            'page.assets.place',
            'page.assets.event',
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
                    {text: translations['page.assets.place'],  handler: () => {}},
                    {text: translations['page.assets.event'],  handler: () => {}},
                    {text: translations['general.cancel'],      role: 'cancel'}
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
