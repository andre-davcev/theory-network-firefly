import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Event, DateEvents } from '@firefly/cloud';

@Component
({
    selector        : 'app-item-events',
    templateUrl     : './item-events.component.html',
    styleUrls       : ['./item-events.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class ComponentItemEvents
{
    @Input()
    public dateEvents: DateEvents;

    @Output()
    public selected: EventEmitter<Event> = new EventEmitter()

    constructor() { }

    public select(event: Event): void
    {
        this.selected.next(event);
    }
}
