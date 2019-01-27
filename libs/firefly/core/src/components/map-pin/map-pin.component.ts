import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Color } from '@firefly/core/enums';

@Component
({
    selector        : 'app-map-pin',
    templateUrl     : './map-pin.component.html',
    styleUrls       : ['./map-pin.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMapPin
{
    @Input() color: Color = Color.Primary;
}
