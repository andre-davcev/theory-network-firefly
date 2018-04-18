import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
export interface ComponentOptions {
    elementRef: ElementRef;
    renderer: Renderer;
    component?: string;
    prefix?: string;
    active?: boolean;
    visible?: boolean;
}
