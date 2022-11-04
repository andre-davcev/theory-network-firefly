import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, HostBinding } from '@angular/core';

@Component
({
    selector: 'tn-image-grid',
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentImageGrid
{
    @Input() urls: Array<string> = [];

    @HostBinding('class.cpt-square')
    @Input()
    square: boolean = false;

    @HostBinding('class.cpt-portrait')
    @Input()
    portrait: boolean = true;

    @Output() clicked: EventEmitter<number> = new EventEmitter();

    constructor() { }

    public click(index: number): void
    {
        this.clicked.next(index);
    }
}
