import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component
({
    selector        : 'app-item-image',
    templateUrl     : './item-image.component.html',
    styleUrls       : ['./item-image.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentItemImage
{
    @Input() url: string;
    @Input() placeholder: string;

    @Output() clicked: EventEmitter<void> = new EventEmitter();

    public clickedImage(): void
    {
        this.clicked.next();
    }
}
