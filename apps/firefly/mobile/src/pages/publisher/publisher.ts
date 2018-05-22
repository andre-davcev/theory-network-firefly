import {Component} from '@angular/core';

import {NavController, ActionSheet, ActionSheetController} from 'ionic-angular';
import {IonicPage}     from 'ionic-angular';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.html'
})

export class PagePublisher
{
    public segment:string = 'clusters';

    constructor(private nav:NavController, private actionSheetController: ActionSheetController)
    {

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
        const actionSheet: ActionSheet = this.actionSheetController.create
        ({
            title                 : 'Modify your album',
            enableBackdropDismiss : true,

            buttons:
            [
                {text: 'Destructive', handler: () => {}},
                {text: 'Archive',     handler: () => {}},
                {text: 'Cancel',      role: 'cancel'}
            ]
        });

        actionSheet.present();
    }
}
