import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component
({
    selector        : 'app-map-annotation',
    templateUrl     : './map-annotation.component.html',
    styleUrls       : ['./map-annotation.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentMapAnnotation
{
    @Input() title: string = 'Location Name';
    @Input() description: string = '123 Address';

    @Input() disclosure: boolean;

    @Output() clicked: EventEmitter<void> = new EventEmitter();

    public click(): void
    {
        this.clicked.next();
    }
}
