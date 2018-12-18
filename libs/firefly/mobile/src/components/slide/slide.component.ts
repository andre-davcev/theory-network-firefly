import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { Slide } from './slide.interface';
import { filter, map, tap } from 'rxjs/operators';

@Component
({
    selector        : 'app-slide',
    templateUrl     : './slide.component.html',
    styleUrls       : ['./slide.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentSlide implements OnInit
{
    @Input() slide: Slide;
    @Input() buttonText: string;
    @Input() routerLink: string;
    @Input() showMap: boolean = false;

    public breakpointShowMap$: Observable<boolean>;

    constructor(private breakpointObserver: BreakpointObserver) { }

    ngOnInit(): void
    {
        this.breakpointShowMap$ = this.breakpointObserver.observe(['(min-height: 890px)']).
        pipe(map((state: BreakpointState) => state.matches));
    }
}
