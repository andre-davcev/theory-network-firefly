import { Component, Input, ChangeDetectionStrategy, OnInit, HostBinding } from '@angular/core';

@Component
({
    selector        : 'app-button-action',
    templateUrl     : './button-action.component.html',
    styleUrls       : ['./button-action.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentButtonAction
{
    @Input() text: string = '';

    constructor() { }
}
