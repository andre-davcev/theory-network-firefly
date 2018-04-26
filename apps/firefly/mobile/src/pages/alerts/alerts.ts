import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';

import {Slides}          from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {IonicPage}       from 'ionic-angular';

import {Alert}           from '../../models/alert';
import {Alerts}          from '../../services/alerts';

@Component
({
    selector    : 'app-page-alerts',
    templateUrl : 'alerts.html'
})

@IonicPage()
export class PageAlerts
{
    @ViewChild(Slides) slides:Slides;

    segment:string = 'fired';

    alerts:Array<Alert>;

    constructor(public alertController:AlertController, public alertsObject:Alerts)
    {
        this.alerts = alertsObject.alerts;

        alertsObject.view(0);
    }

    slideChanged()
    {
        this.alertsObject.view(this.slides.getActiveIndex());
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
