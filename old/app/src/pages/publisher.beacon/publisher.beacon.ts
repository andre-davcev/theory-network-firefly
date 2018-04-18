import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Beacon} from '../../models/beacon';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-beacon',
    templateUrl : 'publisher.beacon.html'
})

export class PagePublisherBeacon extends Page
{
    constructor()
    {
        super();
    }
}