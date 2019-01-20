import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ItemDescription } from './item-description.interface';

@Component
({
    selector        : 'app-item-description',
    templateUrl     : './item-description.component.html',
    styleUrls       : ['./item-description.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentItemDescription
{
    @Input() form: FormGroup;
    @Input() item: ItemDescription;
    @Input() hideImage: boolean;

    @Output() imageClicked: EventEmitter<void> = new EventEmitter();

    constructor() { }

    public clickedImage(): void
    {
        this.imageClicked.next();
/*
        const { Camera } = Plugins;

        from(Camera.getPhoto
        ({
            quality      : 100,
            allowEditing : true,
            resultType   : CameraResultType.Base64,
            source       : CameraSource.Photos
        })).
        subscribe((cameraPhoto: CameraPhoto) =>
        {
            console.log(cameraPhoto);
        });
*/
//        this.imageValue = this.imageValue == null || this.imageValue === 'assets/images/temp-subscriptions-pokemon-go.jpg' ? 'assets/images/temp-subscriptions-lilac-festival.jpg' : 'assets/images/temp-subscriptions-pokemon-go.jpg';
    }

    public get edit(): boolean
    {
        return this.form != null;
    }

    public get imageValue(): string
    {
        this.item.image = this.item.image == null && !this.item.imageAsUrl ? 'image' : this.item.image;

        return this.edit && !this.item.imageAsUrl ? this.form.get(this.item.image).value : this.item.image;
    }

    public set imageValue(image: string)
    {
        if (this.edit)
        {
            this.form.get(this.item.image).setValue(image);
        }
    }
}
