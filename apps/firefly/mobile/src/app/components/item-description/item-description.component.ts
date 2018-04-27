import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component
({
    selector        : 'app-item-description',
    templateUrl     : './item-description.component.html',
//    styleUrls       : ['./item-description.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ItemDescriptionComponent
{
    @Input() form : FormGroup;

    @Input() title : string;

    @Input() image            : string;
    @Input() imagePlaceholder : string = '';
    @Input() imageUrlEmpty    : string;

    @Input() description            : string;
    @Input() descriptionPlaceholder : string = '';

    constructor() { }

    public clickedImage(): void
    {
        if (this.edit)
        {
            this.imageValue = this.imageValue == null || this.imageValue === 'temp/icons/coffee-icon-blue.png' ? 'temp/icons/coffee-icon-pink.png' : 'temp/icons/coffee-icon-blue.png';
        }
    }

    public get edit(): boolean
    {
        return this.form != null;
    }

    public get imageUrl(): string
    {
        return this.edit ? (this.imageValue == null ? this.imageUrlEmpty : this.imageValue) : this.imageValue;
    }

    public get imageValue(): string
    {
        return this.edit ? this.form.get(this.image).value : this.image;
    }

    public set imageValue(image: string)
    {
        if (this.edit)
        {
            this.form.get(this.image).setValue(image);
        }
    }
}
