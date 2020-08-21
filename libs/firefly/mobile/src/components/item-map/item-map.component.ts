import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { StateLocation } from '@theory/capacitor';
import { Observable } from 'rxjs';
import { Color } from '@firefly/core/enums';
import { DirectiveLoadingOptions, StateEvent } from '@firefly/core';
import { BaseComponent } from '@theory/core';
import { takeUntil, filter } from 'rxjs/operators';
import { MapMovingMethod } from '@theory/mapbox';
import { Place } from '@firefly/cloud';

@Component
({
    selector        : 'app-item-map',
    templateUrl     : './item-map.component.html',
    styleUrls       : ['./item-map.component.scss']

})
export class ComponentItemMap extends BaseComponent implements OnInit
{
    @Input() title : string;
    @Input() interactive: boolean = false;

    @Select(StateLocation.isValid) locationValid$ : Observable<boolean>;
    @Select(StateEvent.place)      place$         : Observable<Place>;

    public Color: any = Color;
    public MapMovingMethod: any = MapMovingMethod;

    public loading: DirectiveLoadingOptions =
    {
        loading:         true,
        color:           Color.Dark,
        colorBackground: Color.Map
    };

    constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        this.locationValid$.
        pipe
        (
            takeUntil(this.destroy$),
            filter((valid: boolean) => valid)
        ).
        subscribe(() => this.loading = { ...this.loading, loading: false });
    }
}
