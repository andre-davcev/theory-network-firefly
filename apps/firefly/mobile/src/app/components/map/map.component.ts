import { Component, OnInit} from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { StateLocation } from '../../../state/location/location.state';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { ComponentMapOrb } from '../map-orb/map-orb.component';
import { StateDevice } from '../../../state/device/device.state';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';


@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
//    styleUrls   : ['./map.component.scss']
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
