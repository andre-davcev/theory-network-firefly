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

    @Input()
    public colorBackground: Color = Color.Dark;

    @HostBinding('class.cpt-color-background-dark')
    public get colorBackgroundPrimary(): boolean { return this.colorBackground === Color.Dark; }

    @HostBinding('class.cpt-color-background-grey')
    public get colorBackgroundGrey(): boolean { return this.colorBackground === Color.Grey; }

    @HostBinding('class.cpt-color-background-map')
    public get colorBackgroundMap(): boolean { return this.colorBackground === Color.Map; }

    constructor() { }
}
