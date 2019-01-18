import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemHeader } from './item-header.interface';

@Component
({
    selector        : 'app-item-header',
    templateUrl     : './item-header.component.html',
    styleUrls       : ['./item-header.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentItemHeader
{
    @Input() form: FormGroup;
    @Input() item: ItemHeader;

    @Output() iconClicked: EventEmitter<void> = new EventEmitter();

    constructor() {}

    public clickedIcon(): void
    {
        this.iconClicked.next();
/*
        if (this.edit)
        {
            this.iconValue = this.iconValue == null || this.iconValue === 'assets/icons/temp-coffee-icon-blue.png' ? 'assets/icons/temp-coffee-icon-pink.png' : 'assets/icons/temp-coffee-icon-blue.png';
        }
*/
    }

    public get edit(): boolean
    {
        return this.form != null;
    }

    public get iconUrl(): string
    {
        return this.edit ? (this.iconValue == null ? this.item.iconUrlEmpty : this.iconValue) : this.iconValue;
    }

    public get iconValue(): string
    {
        this.item.icon = this.item.icon == null && !this.item.iconAsUrl ? 'icon' : this.item.icon;

        return this.edit && !this.item.iconAsUrl ? this.form.get(this.item.icon).value : this.item.icon;
    }

    public set iconValue(icon: string)
    {
        if (this.edit)
        {
            this.form.get(this.item.icon).setValue(icon);
        }
    }
}
