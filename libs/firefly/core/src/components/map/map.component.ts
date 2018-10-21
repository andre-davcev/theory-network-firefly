import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GeolocationPosition } from '@capacitor/core';

import { StateDevice, StateLocation } from '@firefly/core/state';
import { ComponentMapOrb } from '../map-orb/map-orb.component';


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
    @Select(StateLocation.location) location$ : Observable<GeolocationPosition>;
    @Select(StateDevice.web)        web$      : Observable<boolean>;

    public location: GeolocationPosition;
    public center: Array<number>;

    private componentMapOrb: ComponentMapOrb;

    constructor() { }

    ngOnInit()
    {
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
