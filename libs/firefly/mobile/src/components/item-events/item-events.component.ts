import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Event, DateEvents } from '@firefly/cloud';
import { IonItemSliding } from '@ionic/angular';
import { from } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
    public selected: EventEmitter<Event> = new EventEmitter();

    @Output()
    public deleted: EventEmitter<Event> = new EventEmitter();

    constructor() { }

    public select(event: Event, sliding: IonItemSliding): void
    {
        from(sliding.closeOpened()).
        pipe
        (
            filter((closed: boolean) =>
                !closed
            ),
            tap(() =>
                this.selected.next(event)
            )
        ).
        subscribe()
    }

    public delete(event: Event): void
    {
        if (!event.notifyComplete)
        {
            this.deleted.next(event);
        }
    }

    public swipe(event): void
    {
        console.log(event);
    }
}
