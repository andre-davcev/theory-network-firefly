import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component
({
    selector        : 'app-item-image',
    templateUrl     : './item-image.component.html',
    styleUrls       : ['./item-image.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentItemImage
{
    @Input() form: FormGroup;
    @Input() edit: boolean = false;
    @Input() url: string;
    @Input() placeholder: string;
    @Input() title: string;

    @Output() clicked: EventEmitter<void> = new EventEmitter();

    constructor(private sanitizer: DomSanitizer) { }

    public clickedImage(): void
    {
        this.form.markAsDirty();
        let control : AbstractControl = this.form.get(['metadata', 'image']);
        control.markAsDirty();
        this.clicked.next();
    }

    public urlSafe(): SafeStyle
    {
        const url: string = this.url == null ? '' : this.url;

        return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
    }
}
