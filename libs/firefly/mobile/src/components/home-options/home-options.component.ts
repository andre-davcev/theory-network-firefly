import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { InterestType, EventType, StateUser, ActionUserEventVirtualSet, ActionUserInterestVirtualSet } from '@firefly/core';
import { Store, Select } from '@ngxs/store';
import { PopoverController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { ActionMobileFilterInterests, ActionMobileFilterEvents } from '@firefly/mobile/state';
import { switchMap, delay } from 'rxjs/operators';

@Component
({
    selector        : 'app-interest-options',
    templateUrl     : './home-options.component.html',
    styleUrls       : ['./home-options.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentHomeOptions
{
    @Select(StateUser.isPublisher) isPublisher$: Observable<boolean>;

    public InterestType : any = InterestType;
    public EventType    : any = EventType;

    @Input() interestType : InterestType;
    @Input() eventType    : EventType;
    @Input() isStream     : boolean;
    @Input() virtual      : boolean;

    constructor
    (
        private store:   Store,
        private popover: PopoverController
    )
    { }

    public filterChanged(event: CustomEvent): void
    {
        const action: any = this.isStream ?
            new ActionMobileFilterInterests(event.detail.value) :
            new ActionMobileFilterEvents(event.detail.value);

        this.store.dispatch(action).
        pipe
        (
            delay(1),
            switchMap(() => from(this.popover.dismiss()))
        ).
        subscribe();
    }

    public virtualChanged(event: CustomEvent): void
    {
        const virtual: boolean = event.detail.checked;

        this.store.dispatch(this.isStream ?
            new ActionUserInterestVirtualSet(virtual) :
            new ActionUserEventVirtualSet(virtual)
        );
    }

}
