import {Input}  from '@angular/core';
import {OnInit} from '@angular/core';

import {Component}        from '../component';
import {ComponentOptions} from '../component.options';

/**
 * @name Icon
 * @description
 */

export class Icon extends Component implements OnInit
{
    @Input()
    public name:string;

    constructor(options:ComponentOptions)
    {
        super
        ({
            elementRef : options.elementRef,
            renderer   : options.renderer,
            prefix     : options.prefix,
            active     : options.active,
            visible    : options.visible,
            component  : options.component == null ? 'icon' : options.component
        });

    }

    ngOnInit()
    {
        this.setClass(this.name, true);
    }
}