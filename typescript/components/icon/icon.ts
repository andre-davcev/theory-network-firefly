import {Input}  from '@angular/core';
import {OnInit} from '@angular/core';

import {TNComponent}        from '../component';
import {TNComponentOptions} from '../component.options';

/**
 * @name TNIcon
 * @description
 */

export class TNIcon extends TNComponent implements OnInit
{
    @Input()
    public name:string;

    constructor(options:TNComponentOptions)
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