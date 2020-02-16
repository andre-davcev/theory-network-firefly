import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component
({
    selector        : 'app-button-add',
    templateUrl     : './button-add.component.html',
    styleUrls       : ['./button-add.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentButtonAdd
{
    constructor() { }
}
