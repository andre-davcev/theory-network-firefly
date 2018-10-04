import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

import { ComponentMapOrb } from '../map-orb/map-orb.component';
import { StateLocation } from '../../state/location/location.state';
import { StateDevice } from '../../state/device/device.state';


@Component
({
    selector        : 'app-map',
    templateUrl     : './map.component.html',
    styleUrls       : ['./map.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMap implements OnInit
{
    @Select(StateLocation.loading)  loading$  : Observable<boolean>;
    @Select(StateLocation.location) location$ : Observable<BackgroundGeolocationResponse>;
    @Select(StateDevice.web)        web$      : Observable<boolean>;

    public location: BackgroundGeolocationResponse;
    public center: Array<number>;

    private componentMapOrb: ComponentMapOrb;

    constructor(private store: Store) { }

    ngOnInit()
    {
        this.location$.subscribe((position: BackgroundGeolocationResponse) =>
        {
            this.location = position;

            this.center =
            [
                position.coords.longitude,
                position.coords.latitude
            ]
        });
    }
}
