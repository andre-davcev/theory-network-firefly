import {Component} from '@angular/core';
import {OnInit}    from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Beacon}         from '../../models/beacon';
import {ServiceBeacons} from '../../services/beacons';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher-beacons',
    templateUrl : 'publisher.beacons.html'
})

export class PagePublisherBeacons extends Page implements OnInit
{
    public beacons:Array<Beacon> =
    [
        {
            major      : 5315,
            majorLabel : 'Music Stages',
            minor      : 27055,
            minorLabel : 'Main Stands',
            uuid       : 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
            uuidLabel  : 'Center Left'
        }
    ];

    constructor(public beaconsService:ServiceBeacons)
    {
        super();
    }

    ngOnInit()
    {
        this.beaconsService.beaconsGet();
    }
}