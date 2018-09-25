import { Component, Input } from '@angular/core';
import { Slide } from './slide.interface';

@Component
({
    selector        : 'app-slide',
    templateUrl     : './slide.component.html',
    styleUrls       : ['./slide.component.scss']
})

export class ComponentSlide
{
    @Input() slide: Slide;

    constructor() { }
}
