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

    constructor() { }

    public get edit(): boolean
    {
        return this.form != null;
    }
}
