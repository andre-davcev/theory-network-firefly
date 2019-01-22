import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { StateLocation } from '@theory/capacitor';
import { Observable } from 'rxjs';

@Component
({
    selector        : 'app-item-map',
    templateUrl     : './item-map.component.html',
    styleUrls       : ['./item-map.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush

})
export class ComponentItemMap
{
    @Input() title : string;
    @Input() interactive: boolean = false;

    @Select(StateLocation.locationValid) locationValid$: Observable<boolean>;

    constructor() { }
}
