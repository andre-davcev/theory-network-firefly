import {Component} from '@angular/core';
import {OnInit}    from '@angular/core';

import {Beacon}         from '../../models/beacon';
import {ServiceBeacons} from '../../services/beacons';

@Component
({
    selector    : 'app-page-publisher-beacons',
    templateUrl : 'publisher-beacons.page.html',
    styleUrls   : ['./publisher-beacons.page.scss']
})

export class PagePublisherBeacons implements OnInit
{

    public beacons:Array<Beacon> =
    [
/*
        {
            major      : 5315,
            majorLabel : 'Music Stages',
            minor      : 27055,
            minorLabel : 'Main Stands',
            uuid       : 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
            uuidLabel  : 'Center Left'
        }
*/
    ];

    constructor(public beaconsService:ServiceBeacons)
    {

    }

    ngOnInit()
    {
        this.beaconsService.beaconsGet();
    }
}
