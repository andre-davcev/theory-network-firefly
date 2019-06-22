import { Component, Input, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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

    constructor() { }

    public toggle(): void
    {
        this.subscribed = !this.subscribed;

        this.clicked.next(this.subscribed);
    }
}
