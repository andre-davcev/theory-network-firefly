import {Input, Output, EventEmitter, ViewChild, OnInit, SimpleChange, HostBinding, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators}                                                    from '@angular/forms';

import {TNDirective}  from './theory.directive';

export class TNInput extends TNDirective implements OnInit
{
    showClear:boolean = false;
    state:string      = '';
    validators        = [];

    form:FormGroup;
    input:FormControl;

    @ViewChild('input') inputElement:ElementRef;

    @Input('tn-name')            name:string           = '';
    @Input('tn-value')           value:any;
    @Input('tn-placeholder')     placeholder:string    = '';
    @Input('tn-host-classes')    hostClasses:string    = '';

    // Validators
    @Input('tn-required')        required:boolean      = false;
    @Input('tn-min-length')      minLength:number;
    @Input('tn-max-length')      maxLength:number;
    @Input('tn-pattern')         pattern:string        = '.*';

    @Input('tn-trim')            trim:boolean          = true;
    @Input('tn-clear')           clear:boolean         = false;
    @Input('tn-validate')        validate:boolean      = false;
    @Input('tn-verifying')       verifying:boolean     = false;
    @Input('tn-valid')           valid:boolean         = false;
    @Input('tn-valid-input')     validInput:boolean    = true;
    @Input('tn-spinner')         spinner:string        = 'spiral'; // android, ios, ios-small, bubbles, circles, crescent, dots, lines, ripple, spiral
    @Input('tn-spinner-classes') spinnerClasses:string = '';
    @Input('tn-rounded-icons')   roundedIcons:boolean  = false;

    @Output('tn-change') change:EventEmitter<any> = new EventEmitter();

    constructor()
    {
        super();
    }

    ngOnInit()
    {
        if (this.minLength != null)
        {
            this.validators.push(Validators.minLength(this.minLength));
        }

        if (this.maxLength != null)
        {
            this.validators.push(Validators.maxLength(this.maxLength));
        }

        if (this.required)
        {
            this.validators.push(Validators.required);
        }

        if (this.pattern != null)
        {
            this.validators.push(Validators.pattern(this.pattern));
        }

        this.input = new FormControl(this.value, Validators.compose(this.validators));

        this.form = new FormGroup
        ({
            input : this.input
        });
    }

    clearValue()
    {
        this.showClear = false;
        this.value     = '';

        this.inputElement.nativeElement.focus();
    }

    isVerified()
    {
        return this.validate && !this.verifying && this.form.dirty && this.form.valid;
    }

    isError()
    {
        return this.validate && !this.verifying && this.form.dirty && !this.form.valid;
    }

    isVerifying()
    {
        return this.validate && this.verifying;
    }

    onChange(value:string)
    {
        if (this.trim)
        {
            this.value = value.trim();
        }
        else
        {
            this.value = value;
        }

        value = this.value;

        if (this.clear)
        {
            if (value != null && value.length > 0)
            {
                this.showClear = true;
            }
            else
            {
                this.showClear = false;
            }

            this.validInput = this.form.valid;
        }
        
        this.change.next(value);
    }
}