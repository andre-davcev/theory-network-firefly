import {Directive} from '@angular/core';

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

export class Keyboard
{
    keyboard:boolean      = false;
    keyboardShown:boolean = false;

    constructor()
    {

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