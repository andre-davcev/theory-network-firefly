import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Slide } from './slide.interface';

@Component
({
    selector        : 'app-slide',
    templateUrl     : './slide.component.html',
    styleUrls       : ['./slide.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentSlide
{
    @Input() slide: Slide;
    @Input() buttonText: string;
    @Input() routerLink: string;

/*
    public breakpointShowMap$: Observdable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver) { }


    ngOnInit(): void
    {
        this.breakpointShowMap$ = this.breakpointObserver.observe(['(min-height: 882px)']).
        pipe(map((state: BreakpointState) => state.matches));
    }
*/
}
