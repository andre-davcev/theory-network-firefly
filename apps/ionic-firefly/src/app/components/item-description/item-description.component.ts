import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component
({
    selector        : 'app-item-description',
    templateUrl     : './item-description.component.html',
    styleUrls       : ['./item-description.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentItemDescription
{
    @Input() form : FormGroup;

    @Input() title : string;

    @Input() image            : string;
    @Input() imagePlaceholder : string = '';

    @Input() description            : string;
    @Input() descriptionPlaceholder : string = '';

    constructor() { }
//    constructor(private sanitizer: DomSanitizer) { }

    public clickedImage(): void
    {
/*
        const { Camera } = Plugins;

        fromPromise(Camera.getPhoto
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
        this.imageValue = this.imageValue == null || this.imageValue === 'assets/temp/images/subscriptions/pokemon-go.jpg' ? 'assets/temp/images/subscriptions/lilac-festival.jpg' : 'assets/temp/images/subscriptions/pokemon-go.jpg';
    }

    public get edit(): boolean
    {
        return this.form != null;
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
