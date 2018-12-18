import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';

import { StateDevice, StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
//import { ComponentMapOrb } from '../map-orb/map-orb.component';


@Component
({
    selector        : 'app-map',
    templateUrl     : './map.component.html',
    styleUrls       : ['./map.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMap extends BaseComponent implements OnInit
{
    @Select(StateLocation.loading)       loading$  : Observable<boolean>;
    @Select(StateLocation.location)      location$ : Observable<GeolocationPosition>;
    @Select(StateDevice.web)             web$      : Observable<boolean>;
    @Select(StateLocation.locationValid) locationValid$: Observable<boolean>;

    @Input() interactive: boolean = true;

    public location: GeolocationPosition;
    public center: Array<number>;

//    private componentMapOrb: ComponentMapOrb;

    constructor(private changeDetectorRef: ChangeDetectorRef)
    {
        super();
    }

    ngOnInit()
    {
        // ToDo: Add takeUntil(this.destroy$)
        this.location$.
        pipe(filter(position => position != null)).
        subscribe((position: GeolocationPosition) =>
        {
            this.location = position;

            this.center =
            [
                position.coords.longitude,
                position.coords.latitude
            ];

            this.changeDetectorRef.markForCheck();
        });
    }
}
