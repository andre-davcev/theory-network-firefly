import { Component, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Slides, AlertController, ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

import { Alert } from '@firefly/core';

import { PageStream } from '../stream/stream.page';
import { PageSearch } from '../search/search.page';
import { PageSubscriptions } from '../subscriptions/subscriptions.page';
import { PagePublisherCluster } from '../cluster/cluster.page';
import { PageUser } from '../user/user.page';
import { StateNotifications } from '../../state/notifications/notifications.state';

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

    @Select(StateNotifications.notifications) notifications$: Observable<Array<Alert>>;

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

    constructor(public alertController: AlertController, private modalController: ModalController) { }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    slideChanged()
    {
        from(this.slides.getActiveIndex()).

        pipe(tap((index: number) => console.log('Slide Changed: ' + index)));
    }

    navigate(type: AlertsModalType): void
    {
        let modal: HTMLIonModalElement = this.modals[type];

        if (modal == null)
        {
            from(this.modalController.create({ component: this.pages[type] })).
            subscribe((element: HTMLIonModalElement) =>
            {
                modal = this.modals[type] = element;

                modal.present();
            })
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
