import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { Alert } from '@firefly/cloud';

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

    @Output() alertGoClicked: EventEmitter<void> = new EventEmitter();
    @Output() alertDetailClicked: EventEmitter<void> = new EventEmitter();

    public clickedAlertGo(): void
    {
      this.alertGoClicked.next();
    }

    public clickedAlertDetail(): void
    {
      this.alertDetailClicked.next();
    }
}
