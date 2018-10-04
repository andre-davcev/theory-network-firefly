import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component
({
    selector        : 'app-icon',
    templateUrl     : './icon.component.html',
    styleUrls       : ['./icon.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentIcon
{
    @HostBinding('class.cpt-active')
    @Input()
    public active: boolean = true;

    @HostBinding('class.cpt-visible')
    @Input()
    public visible: boolean = true;

    constructor() { }
}
