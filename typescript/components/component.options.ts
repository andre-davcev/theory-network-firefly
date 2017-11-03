import {ElementRef}  from '@angular/core';
import {Renderer}    from '@angular/core';

export interface TNComponentOptions
{
    elementRef:ElementRef,
    renderer:Renderer,
    component?:string,
    prefix?:string,
    active?:boolean,
    visible?:boolean
}