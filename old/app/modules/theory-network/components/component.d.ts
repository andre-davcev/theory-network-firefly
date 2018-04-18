import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { ComponentOptions } from './component.options';
export declare class Component {
    protected elementRef: ElementRef;
    protected renderer: Renderer;
    protected component: string;
    protected prefix: string;
    protected active: boolean;
    protected visible: boolean;
    constructor(options: ComponentOptions);
    protected class(name: string): string;
    protected setClass(className: string, add: boolean): void;
    protected setAttribute(name: string, value: any): void;
    protected setStyle(property: string, value: string): void;
    protected nativeElement(): any;
}
