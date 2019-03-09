import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() disclosure: boolean;

    @Output() clicked: EventEmitter<void> = new EventEmitter();

    constructor()
    {
        console.log('WHATS UP');
    }

    public click(): void
    {
        this.clicked.next();
    }
}
