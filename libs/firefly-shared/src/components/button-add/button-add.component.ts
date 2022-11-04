import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component
({
    selector        : 'ff-button-add',
    templateUrl     : './button-add.component.html',
    styleUrls       : ['./button-add.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentButtonAdd
{
    @Output() clicked: EventEmitter<void> = new EventEmitter();
}
