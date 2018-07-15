import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';

import {Slides, NavController, ModalController, Modal}          from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {IonicPage}       from 'ionic-angular';

import {Alert}           from '../../models/alert';
import {Alerts}          from '../../services/alerts';
import {AlertsModalType} from './alerts-modal.enum';
import {StatusBar}       from '@ionic-native/status-bar';
import { PageFind } from '../find/find';
import { PagePublisher } from '../publisher/publisher';
import { PageUser } from '../user/user';
import { PageSearch } from '../search/search.page';
import { PageSubscriptions } from '../subscriptions/subscriptions.page';

@Component
({
    selector    : 'app-page-alerts',
    templateUrl : 'alerts.html'
})

@IonicPage()
export class PageNotifications
{
    @ViewChild(Slides) slides:Slides;

    segment:string = 'fired';

    alerts:Array<Alert>;

    public AlertsModalType: any = AlertsModalType;

    public modals: Array<Modal> =
    [
        null,
        null,
        null,
        null,
        null
    ];

    public pages: Array<any> =
    [
        PageFind,
        PageSearch,
        PagePublisher,
        PageSubscriptions,
        PageUser
    ];

    constructor(public alertController:AlertController, public alertsObject:Alerts, private statusBar: StatusBar, private nav: NavController, public modalController: ModalController)
    {
        this.alerts = alertsObject.alerts;

        alertsObject.view(0);
    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }

    slideChanged()
    {
        this.alertsObject.view(this.slides.getActiveIndex());
    }

    navigate(type: AlertsModalType): void
    {
        let modal: Modal = this.modals[type];

        if (modal == null)
        {
            modal = this.modals[type] = this.modalController.create(this.pages[type]);
        }

        modal.present();
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
