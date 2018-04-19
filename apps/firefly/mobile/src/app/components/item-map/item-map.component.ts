import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component
({
    selector        : 'app-item-map',
    templateUrl     : './item-map.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
    //  styleUrls: ['./item-map.component.scss'],
})
export class ComponentItemMap
{
    @Input() title : string;
    
    constructor() { }
}
