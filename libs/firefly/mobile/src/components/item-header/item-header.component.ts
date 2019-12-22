import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

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

    @Input() iconUrl:         string;
    @Input() iconUrlEmpty:    string;
    @Input() iconPlaceholder: string;

    @Input() title:            string;
    @Input() titlePlaceholder: string;

    @Input() subtitle:            string;
    @Input() subtitlePlaceholder: string;

    @Input() iconOnly:           boolean;

    @Output() iconClicked: EventEmitter<void> = new EventEmitter();

    constructor() {}

    public clickedIcon(): void
    {
        this.form.controls.bucketPath.markAsDirty();
        this.iconClicked.next();
    }

    public get edit(): boolean
    {
        return this.form != null;
    }

    public get url(): string
    {
        return this.edit ? (this.iconUrl == null ? this.iconUrlEmpty : this.iconUrl) : this.iconUrl;
    }

    public hasError(name: string): boolean
    {
        const control: AbstractControl = this.form.get(name);

        return control.invalid && (control.dirty || control.touched);
    }
}
