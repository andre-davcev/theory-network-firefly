import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Alert } from '@firefly/core';

@Component
({
    selector        : 'app-slide',
    templateUrl     : './slide.component.html',
    styleUrls       : ['./slide.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentSlide
{
    @Input() slide:      Alert;
    @Input() buttonText: string;
    @Input() routerLink: string;
}
