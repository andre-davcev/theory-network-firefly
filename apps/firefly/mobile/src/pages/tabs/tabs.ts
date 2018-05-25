import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';
import {IonicPage} from 'ionic-angular';

import {Alerts} from '../../services/alerts';

import {PageFind}        from '../find/find';
import {PageAlerts}      from '../alerts/alerts';
import {PagePublisher}   from '../publisher/publisher';
import {PageUser}        from '../user/user';
import { StatusBar } from '@ionic-native/status-bar';

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
    dict:Object;

    constructor(navParams: NavParams, public alerts: Alerts, private statusBar: StatusBar)
    {
        this.selected = navParams.data.tabIndex || 0;
    }
}
