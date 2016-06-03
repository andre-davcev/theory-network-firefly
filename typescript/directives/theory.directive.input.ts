import {Input, Output, EventEmitter, ViewChild, OnInit, OnChanges, SimpleChange, HostBinding}    from '@angular/core';
import {NgForm, Control, Validators, NgModel}                                                    from '@angular/common';

import {TNDirective}  from './theory.directive';

export class TNInput extends TNDirective implements OnChanges
{
    showClear:boolean = false;
    state:string      = '';
    validators        = [];

    valueControl:Control;

    @HostBinding() host;

    @ViewChild('input') input;
    @ViewChild('form')  form;

    @Input('tn-name')            name:string           = '';
    @Input('tn-value')           value:any;
    @Input('tn-placeholder')     placeholder:string    = '';

    // Validators
    @Input('tn-required')        required:boolean      = false;
    @Input('tn-min-length')      minLength:number      = 1;
    @Input('tn-max-length')      maxLength:number      = -1;
    @Input('tn-pattern')         pattern:string        = '.*';

    @Input('tn-trim')            trim:boolean          = true;
    @Input('tn-clear')           clear:boolean         = false;
    @Input('tn-validate')        validate:boolean      = false;
    @Input('tn-verifying')       verifying:boolean     = false;
    @Input('tn-valid-input')     validInput:boolean    = true;
    @Input('tn-spinner')         spinner:string        = 'spiral'; // android, ios, ios-small, bubbles, circles, crescent, dots, lines, ripple, spiral
    @Input('tn-spinner-classes') spinnerClasses:string = '';
    @Input('tn-rounded-icons')   roundedIcons:boolean  = false;

    @Output('tn-change') change:EventEmitter<any> = new EventEmitter();

    constructor()
    {
        super();
    }

    initialize(options?:Object)
    {
        super.initialize(options);

        this.validators =
        [
            Validators.minLength(this.minLength),
            Validators.maxLength(this.maxLength)
        ];

        if (this.required)
        {
            this.validators.push(Validators.required);
        }

        if (this.pattern != null)
        {
            this.validators.push(Validators.pattern(this.pattern));
        }

        this.valueControl = new Control(this.value, Validators.compose(this.validators));
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange})
    {
        let
        valueProperties = changes['value'];

        if (this.clear && valueProperties != null)
        {
            let
            value = valueProperties.currentValue;

            if (value != null)
            {
                if (value.length > 0)
                {
                    this.showClear = true;
                }
                else
                {
                    this.showClear = false;
                }
            }
            else
            {
                this.showClear = false;
            }

            this.validInput = this.valueControl.valid;

            this.change.next(value);
        }
    }

    clearValue()
    {
        this.showClear = false;
        this.value     = '';

        this.input.focus();
    }

    isVerified()
    {
        return this.validate && !this.verifying && this.valueControl.dirty && this.valueControl.valid;
    }

    isError()
    {
        return this.validate && !this.verifying && this.valueControl.dirty && !this.valueControl.valid;
    }

    isVerifying()
    {
        return this.validate && this.state === 'verifying';
    }
}