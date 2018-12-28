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

    @Input()
    public name: string;

    @HostBinding('class')
    public get class(): string
    {
        const classes: Array<string> = [];

        if (this.active)
        {
            classes.push('cpt-active');
        }

        if (this.visible)
        {
            classes.push('cpt-visible');
        }

        if (this.name != null)
        {
            classes.push(`cpt-${this.name}`);
        }

        return classes.join(' ');
    }

    constructor() { }
}
