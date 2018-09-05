import { Component, ViewChild } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap } from 'rxjs/operators';
import { Slides, NavController, AlertController, ModalController } from '@ionic/angular';

import { PageStream } from '../stream/stream.page';
import { PageSearch } from '../search/search.page';
import { PageSubscriptions } from '../subscriptions/subscriptions.page';
import { PagePublisherCluster } from '../cluster/cluster.page';
import { Alert } from '../../models/alert.model';
import { PageUser } from '../user/user.page';
import { ServiceAlerts } from '../../services/alerts.service';

export enum AlertsModalType
{
    Feed,
    Search,
    Publish,
    Subscriptions,
    Settings
}

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome
{
    @ViewChild(Slides) slides: Slides;

    segment:string = 'fired';

    alerts:Array<Alert>;

    public AlertsModalType: any = AlertsModalType;

    public modals: Array<HTMLIonModalElement> =
    [
        null,
        null,
        null,
        null,
        null
    ];

    public pages: Array<any> =
    [
        PageStream,
        PageSearch,
        PagePublisherCluster,
        PageSubscriptions,
        PageUser
    ];

    constructor(public alertController: AlertController, public alertsObject: ServiceAlerts, private nav: NavController, public modalController: ModalController)
    {
        this.alerts = alertsObject.alerts;

        alertsObject.view(0);
    }

    ionViewWillEnter()
    {
//        this.statusBar.styleDefault();
    }

    slideChanged()
    {
        this.alertsObject.view(this.slides.getActiveIndex());
    }

    navigate(type: AlertsModalType): void
    {
        let modal: HTMLIonModalElement = this.modals[type];

        if (modal == null)
        {
            fromPromise(this.modalController.create(this.pages[type])).pipe
            (
                tap((element: HTMLIonModalElement) =>
                {
                    modal = this.modals[type] = element;

                    modal.present();
                })
            )
        }
        else
        {
          modal.present();
        }
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
