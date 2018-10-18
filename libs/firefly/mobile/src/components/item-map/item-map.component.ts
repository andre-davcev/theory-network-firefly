import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component
({
    selector        : 'app-item-map',
    templateUrl     : './item-map.component.html',
    styleUrls       : ['./item-map.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush

})
export class ComponentItemMap
{
    @Input() title : string;

    constructor() { }
}
