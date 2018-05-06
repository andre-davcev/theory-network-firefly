import { Component, OnInit} from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { StateLocation } from '../../../state/location.state';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/core';
import { ComponentMapOrb } from '../map-orb/map-orb.component';


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

    public location: GeolocationPosition;

    private componentMapOrb: ComponentMapOrb;

    constructor(private store: Store) { }

    ngOnInit()
    {
        this.location$.subscribe((position: GeolocationPosition) => this.location = position);
    }
}
