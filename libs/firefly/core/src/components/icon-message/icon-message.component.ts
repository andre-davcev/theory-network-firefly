import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IconType, IconSize } from '../icon';
import { Color } from '@firefly/core/enums';

@Component
({
    selector        : 'app-icon-message',
    templateUrl     : './icon-message.component.html',
    styleUrls       : ['./icon-message.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentIconMessage
{
    @Input()
    public icon: IconType;

    @Input()
    public message: string = '';

    @Input()
    public gap: string = '1rem';

    public IconType : any = IconType;
    public IconSize : any = IconSize;
    public Color    : any = Color;

    constructor() { }
}
