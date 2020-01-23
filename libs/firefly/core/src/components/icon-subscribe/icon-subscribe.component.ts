import { Component, Input, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component
({
    selector        : 'app-icon-subscribe',
    templateUrl     : './icon-subscribe.component.html',
    styleUrls       : ['./icon-subscribe.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentIconSubscribe
{
    @HostBinding('class.cpt-subscribed')
    @Input()
    public subscribed: boolean = false;

    @Input()
    public count: number;

    @Output()
    public clicked: EventEmitter<boolean> = new EventEmitter();

    public faThumbtack: IconDefinition = faThumbtack;

    constructor() { }

    public toggle(): void
    {
        // this.subscribed = !this.subscribed;

        this.clicked.next(this.subscribed);
    }
}
