import { Component, OnInit} from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { StateLocation } from '../../../state/location/location.state';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { GeolocationPosition, DeviceInfo } from '@capacitor/core';
import { ComponentMapOrb } from '../map-orb/map-orb.component';
import { StateDevice } from '../../../state/device/device.state';


@Component
({
    selector    : 'app-map',
    templateUrl : './map.component.html',
//    styleUrls   : ['./map.component.scss']
})
export class ComponentMap implements OnInit
{
    @Select(StateLocation.loading)  loading$  : Observable<boolean>;
    @Select(StateLocation.location) location$ : Observable<GeolocationPosition>;
    @Select(StateDevice.web)        web$      : Observable<boolean>;
    @Select(StateDevice.info)        info$      : Observable<DeviceInfo>;

    public location: GeolocationPosition;
    public center: Array<number>;

    private componentMapOrb: ComponentMapOrb;

    constructor(private store: Store) { }

    ngOnInit()
    {
        this.info$.subscribe(val => console.log(val));
        this.location$.subscribe((position: GeolocationPosition) =>
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
