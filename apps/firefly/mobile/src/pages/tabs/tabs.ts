import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';
import {IonicPage} from 'ionic-angular';

import {Alerts} from '../../services/alerts';

import {PageFind}        from '../find/find';
import {PageAlerts}      from '../alerts/alerts';
import {PagePublisher}   from '../publisher/publisher';
import {PageUser}        from '../user/user';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-tabs',
    templateUrl : 'tabs.html'
})

export class PageTabs extends Page
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

    constructor(navParams: NavParams, public alerts: Alerts)
    {
        super();

        this.selected = navParams.data.tabIndex || 0;
    }
}