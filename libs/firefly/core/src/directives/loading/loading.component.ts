import { Component, Input, HostBinding } from '@angular/core';
import { Color } from '@firefly/core/enums';

@Component
({
    selector    : 'app-loading',
    templateUrl : './loading.component.html',
    styleUrls   : ['./loading.component.scss']
})
export class ComponentLoading
{
    @Input()
    public color: Color = Color.Primary;

    @HostBinding('class.cpt-color-primary')
    public get colorPrimary(): boolean { return this.color === Color.Primary; }

    @HostBinding('class.cpt-color-white')
    public get colorWhite(): boolean { return this.color === Color.White; }
    constructor() { }
}
