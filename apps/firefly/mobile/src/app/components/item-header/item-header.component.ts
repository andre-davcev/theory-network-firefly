import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component
({
    selector        : 'app-item-header',
    templateUrl     : './item-header.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush
    //  styleUrls: ['./item-header.component.scss'],
})

export class ComponentItemHeader
{
    @Input() form: FormGroup;

    @Input() icon            : string;
    @Input() iconPlaceholder : string = '';
    @Input() iconUrlEmpty    : string;

    @Input() title            : string;
    @Input() titlePlaceholder : string = '';

    @Input() subtitle            : string;
    @Input() subtitlePlaceholder : string = '';

    constructor() {}

    public clickedIcon(): void
    {
        if (this.edit)
        {
            this.iconValue = this.iconValue == null || this.iconValue === 'temp/icons/coffee-icon-blue.png' ? 'temp/icons/coffee-icon-pink.png' : 'temp/icons/coffee-icon-blue.png';
        }
    }

    public get edit(): boolean
    {
        return this.form != null;
    }

    public get iconUrl(): string
    {
        return this.edit ? (this.iconValue == null ? this.iconUrlEmpty : this.iconValue) : this.iconValue;
    }

    public get iconValue(): string
    {
        return this.edit ? this.form.get(this.icon).value : this.icon;
    }

    public set iconValue(icon: string)
    {
        if (this.edit)
        {
            this.form.get(this.icon).setValue(icon);
        }
    }

    public get titleValue(): string
    {
        return this.edit ? this.form.get(this.title).value : this.title;
    }

    public set titleValue(title: string)
    {
        if (this.edit)
        {
            this.form.get(this.title).setValue(title);
        }
    }

    public get subtitleValue(): string
    {
        return this.edit ? this.form.get(this.subtitle).value : this.subtitle;
    }

    public set subtitleValue(subtitle: string)
    {
        if (this.edit)
        {
            this.form.get(this.subtitle).setValue(subtitle);
        }
    }
}
