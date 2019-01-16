import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages } from '../pages.enum';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome
{
    public Pages:      any     = Pages;
    public showAlerts: boolean = true;

    public child: Pages.Alert | Pages.Stream = Pages.Alert;

    constructor
    (
        public alertController: AlertController,
        private store: Store
    ) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));

        if (!this.showAlerts)
        {
            this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]));
        }
    }

    navigate(type: Pages): void
    {
        this.store.dispatch(new Navigate([type]));
    }

    alertStreamToggle(type: Pages.Alert | Pages.Stream)
    {
        this.child = type;
      this.store.dispatch(new Navigate([Pages.Home, type]));

      this.showAlerts = type === Pages.Alert;
    }

    deleteConfirm()
    {
        /*
        let confirm = this.alertController.create
        ({
            title   : dictionary.deleteConfirmTitle,
            message : dictionary.deleteConfirmMessage,
            buttons :
            [
                {
                    text    : dictionary.deleteConfirmDisagree,
                    handler : () => {}
                },

                {
                    text    : dictionary.deleteConfirmAgree,
                    handler : () =>
                    {
                        let
                        index = this.slides.getActiveIndex();

                        this.alertsObject.delete(index);

                        if (this.slides.isEnd())
                        {
                            this.slides.slideTo(index - 1);
                        }

                        this.slides.update();
                    }
                }
            ]
        });

        confirm.present();
*/
    }
}
