import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Color } from '@firefly/core/enums';
import { DirectiveLoadingOptions } from '@firefly/core';
import { BaseComponent } from '@theory/core';
import { takeUntil, filter } from 'rxjs/operators';
import { MapMovingMethod } from '@theory/mapbox';
import { Place } from '@firefly/cloud';
import { StateLocation } from '@theory/capacitor';

@Component
({
    selector        : 'app-item-map',
    templateUrl     : './item-map.component.html',
    styleUrls       : ['./item-map.component.scss']

})
export class ComponentItemMap extends BaseComponent implements OnInit
{
    @Input() title       : string;
    @Input() interactive : boolean = false;
    @Input() place       : Place;

    @Select(StateLocation.isValid) locationValid$ : Observable<boolean>;

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
        subscribe(() =>
            this.loading = { ...this.loading, loading: false }
        );
    }
}
