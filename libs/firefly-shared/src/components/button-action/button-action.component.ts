import { Component, Input, ChangeDetectionStrategy, HostBinding, ElementRef } from '@angular/core';

import { Color } from '../..//enums';

@Component
({
    selector        : 'ff-button-action',
    templateUrl     : './button-action.component.html',
    styleUrls       : ['./button-action.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentButtonAction
{
    @Input()
    public text: string = '';

    @Input()
    public textColor: Color = Color.White;

    @Input()
    public color: Color = Color.Primary;

    public classes: Array<string> = [];

    constructor
    (
        private element : ElementRef
    )
    { }

    public ngOnInit(): void
    {
        this.element.nativeElement.classList.forEach((name: string) =>
            this.classes.push(name)
        );
    }

    @HostBinding('class')
    public get class(): string
    {
        const classes: Array<string> = [];

        this.classes.forEach((name: string) =>
            classes.push(name)
        );

        classes.push(`cpt-color-${this.color}`);
        classes.push(`cpt-text-color-${this.textColor}`);

        return classes.join(' ');
    }
}
