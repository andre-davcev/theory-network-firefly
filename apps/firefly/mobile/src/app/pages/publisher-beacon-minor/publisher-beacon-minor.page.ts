import { Component } from '@angular/core';

import { Beacon } from '@firefly/core';

@Component
({
    selector    : 'app-page-publisher-beacon-minor',
    templateUrl : 'publisher-beacon-minor.page.html',
    styleUrls   : ['./publisher-beacon-minor.page.scss']
})

export class PagePublisherBeaconMinor
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
}
