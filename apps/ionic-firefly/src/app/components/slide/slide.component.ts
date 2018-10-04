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

    constructor() { }
}
