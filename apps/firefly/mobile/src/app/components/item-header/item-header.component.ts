import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component
({
    selector        : 'app-item-header',
    templateUrl     : './item-header.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
    //  styleUrls: ['./item-header.component.scss'],
})

export class ComponentItemHeader implements OnInit
{
    @Input() edit: boolean = false;

    @Input() icon            : string;
    @Input() iconEmpty       : string;
    @Input() iconPlaceholder : string = '';

    @Input() title            : string;
    @Input() titlePlaceholder : string = '';

    @Input() subtitle            : string;
    @Input() subtitlePlaceholder : string = '';

    @Output() form: EventEmitter<FormGroup> = new EventEmitter();

    public formGroup: FormGroup;
    
    constructor(private formBuilder: FormBuilder) {}

    public ngOnInit(): void
    {
        if (this.edit)
        {
            this.formGroup = this.formBuilder.group
            ({
                icon     : [this.icon,     [Validators.required, Validators.minLength(1)]],
                title    : [this.title,    [Validators.required, Validators.minLength(1)]],
                subtitle : [this.subtitle, [Validators.required, Validators.minLength(1)]],
            });

            this.form.emit(this.formGroup);
        }
    }

    public clickedIcon(): void
    {
        if (this.edit)
        {
            this.icon = this.icon == null || this.icon === 'temp/icons/coffee-icon-blue.png' ? 'temp/icons/coffee-icon-pink.png' : 'temp/icons/coffee-icon-blue.png';
        }
    }

    public get iconUrl(): string
    {
        return this.edit ? (this.icon == null ? this.iconEmpty : this.icon) : this.icon;
    }
}
