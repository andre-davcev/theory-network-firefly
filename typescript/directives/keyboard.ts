import {Directive}    from '@angular/core';

import {TNDirective}  from '../components/input/directive';


@Directive
({
    selector: '[tn-keyboard]',

    host :
    {
        '(native.keyboardshow)'      : 'keyboardShow()',
        '(native.keyboardhide)'      : 'keyboardHide()',
        '[class.tn-keyboard]'        : 'keyboard',
        '[class.tn-keyboard-hidden]' : '!keyboard',
        '[class.tn-keyboard-shown]'  : 'keyboardShown'
    }
}) 

export class TNKeyboard extends TNDirective
{
    keyboard:boolean      = false;
    keyboardShown:boolean = false;

    constructor()
    {
        super();
    }

    keyboardShow()
    {
        this.keyboard      = true;
        this.keyboardShown = true;
    }

    keyboardHide()
    {
        this.keyboard = false
    }
}