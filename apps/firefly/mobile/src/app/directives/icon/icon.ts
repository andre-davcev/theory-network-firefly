import {Directive}  from '@angular/core';
import {ElementRef} from '@angular/core';
import {Renderer}   from '@angular/core';

import {Icon} from 'theory-network';

@Directive
({
    selector : 'ff-icon'
})

export class FFIcon extends Icon
{
    constructor(elementRef:ElementRef, renderer: Renderer)
    {
        super
        ({
            elementRef : elementRef,
            renderer   : renderer,
            prefix     : 'ff'
        });
    }
}