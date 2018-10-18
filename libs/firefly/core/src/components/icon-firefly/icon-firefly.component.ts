import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component
({
    selector        : 'app-icon-firefly',
    templateUrl     : './icon-firefly.component.html',
    styleUrls       : ['./icon-firefly.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentIconFirefly
{
    @HostBinding('class.cpt-animate')
    @Input()
    public animate: boolean = false;

    constructor() {}
}
