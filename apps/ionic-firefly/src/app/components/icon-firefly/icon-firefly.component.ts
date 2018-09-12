import { Component, HostBinding, Input } from '@angular/core';

@Component
({
    selector: 'app-icon-firefly',
    templateUrl: './icon-firefly.component.html',
    styleUrls: ['./icon-firefly.component.scss']
})
export class ComponentIconFirefly
{
    @HostBinding('class.cpt-animate')
    @Input()
    public animate: boolean = false;

    constructor() {}
}
