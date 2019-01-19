import { Component, OnInit, ChangeDetectorRef, Input, HostBinding, AfterViewInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, BehaviorSubject, combineLatest, from } from 'rxjs';
import { filter, takeUntil,  map, delay } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';

import { StateDevice, StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';

@Component
({
    selector        : 'app-map',
    templateUrl     : './map.component.html',
    styleUrls       : ['./map.component.scss']
})
export class ComponentMap extends BaseComponent implements OnInit, AfterViewInit
{
    @Select(StateLocation.loading)       loading$  : Observable<boolean>;
    @Select(StateLocation.location)      location$ : Observable<GeolocationPosition>;
    @Select(StateDevice.web)             web$      : Observable<boolean>;
    @Select(StateLocation.locationValid) locationValid$: Observable<boolean>;

    @Input() interactive: boolean = true;

    public location: GeolocationPosition;
    public center: Array<number>;

    public mapReady$: Observable<boolean>;
    private contentInitiated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    @Input()
    @HostBinding('style.width')
    public width: string = '100%';

    @Input()
    @HostBinding('style.height')
    public height: string = '100%';

    constructor(private changeDetectorRef: ChangeDetectorRef)
    {
        super();
    }

    ngOnInit()
    {
        this.location$.
        pipe
        (
            takeUntil(this.destroy$),
            filter(position => position != null)
        ).
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

        this.mapReady$ = combineLatest(this.locationValid$, this.contentInitiated$).
        pipe
        (
            filter(([locationValid, contentInitiated]) => locationValid && contentInitiated),
            map(() => true),
            delay(100)
        );
    }
    public ngAfterViewInit(): void
    {
        this.contentInitiated$.next(true);
    }
}
