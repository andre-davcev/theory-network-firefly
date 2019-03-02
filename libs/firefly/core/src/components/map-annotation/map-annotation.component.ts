import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Location } from '@firefly/core/models';

@Component
({
    selector        : 'app-map-annotation',
    templateUrl     : './map-annotation.component.html',
    styleUrls       : ['./map-annotation.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMapAnnotation
{
    @Input() location: Location;
}
