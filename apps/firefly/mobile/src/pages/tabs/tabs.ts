import {Component} from '@angular/core';

import {NavParams, ToastController, App} from 'ionic-angular';
import {IonicPage} from 'ionic-angular';

import {Alerts} from '../../services/alerts';

import {PageFind}        from '../find/find';
import {PageAlerts}      from '../alerts/alerts';
import {PagePublisher}   from '../publisher/publisher';
import {PageUser}        from '../user/user';
import { StatusBar } from '@ionic-native/status-bar';
import { filter } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { StateNotifications } from '../../state/notifications/notifications.state';
import { Observable } from 'rxjs';
import {PushNotification} from '../../models/push-notification.model';

@IonicPage()
@Component
({
    selector    : 'app-page-tabs',
    templateUrl : 'tabs.html'
})

export class PageTabs
{
    tabs:Array<any> =
    [
        'PageFind',
        'PageAlerts',
        'PagePublisher',
        'PageUser'
    ];

    selected:number;

    @Select(StateNotifications.notification) pushNotifications$: Observable<PushNotification>;

    constructor(navParams: NavParams, public alerts: Alerts, private statusBar: StatusBar, private app : App, private toastController : ToastController)
    {
        this.selected = navParams.data.tabIndex || 0;
    }

    ionViewDidLoad()
    {
        this.pushNotifications$.
        pipe(filter((push: PushNotification) => push != null)).
        subscribe((push: PushNotification) =>
        {
            // If we opened app from notification or in the background
            if (push.tap)
            {
                this.app.getActiveNav().push('PageAlerts');
            }
            // If the application is already in the foreground
            else
            {
                this.toastController.create
                ({
                    message: `${push.aps.alert.title}: ${push.aps.alert.body}`,
                    duration: 4000
                }).present();
            }
        });
    }
}
