import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component
({
    selector        : 'ff-map-pin',
    templateUrl     : './map-pin.component.html',
    styleUrls       : ['./map-pin.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMapPin
{
    @HostBinding('class.cpt-added')
    @Input() added: boolean = false;
}
