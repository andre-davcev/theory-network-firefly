import {ElementRef}  from '@angular/core';
import {Renderer}    from '@angular/core';
import {Input}       from '@angular/core';
import {HostBinding} from '@angular/core';

import {TNComponentOptions} from './component.options';

/**
 * Base class for all Theory Network components.
 */

/** @hidden */
export class TNComponent
{
    /** @hidden */
    protected elementRef:ElementRef;

    /** @hidden */
    protected renderer:Renderer;

    /** @hidden */
    protected component:string;

    /** @hidden */
    protected prefix:string;

    /** @hidden */
    @HostBinding('class.tn-active')
    @Input()
    protected active:boolean = true;

    /** @hidden */
    @HostBinding('class.tn-visible')
    @Input()
    protected visible:boolean = true;

    constructor(options:TNComponentOptions)
    {
        this.elementRef = options.elementRef;
        this.renderer   = options.renderer;
        this.component  = options.component;
        this.prefix     = options.prefix  == null ? 'tn' : options.prefix;

        this.setClass(this.component, true);
    }

    protected class(name:string)
    {
        return this.prefix + '-' + name;
    }

    /** @hidden */
    protected setClass(className: string, add: boolean)
    {
        this.renderer.setElementClass(this.nativeElement(), this.class(className), add);
    }

    /** @hidden */
    protected setAttribute(name: string, value: any)
    {
        this.renderer.setElementAttribute(this.nativeElement(), name, value);
    }

    /** @hidden */
    protected setStyle(property: string, value: string)
    {
        this.renderer.setElementStyle(this.nativeElement(), property, value);
    }

    /** @hidden */
    protected nativeElement():any
    {
        return this.elementRef.nativeElement;
    }
}