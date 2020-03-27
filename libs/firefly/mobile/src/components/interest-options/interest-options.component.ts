import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { InterestType, ActionUserInterestTypeSet, EventType, ActionUserEventTypeSet, StateUser } from '@firefly/core';
import { Store, Select } from '@ngxs/store';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component
({
    selector        : 'app-interest-options',
    templateUrl     : './interest-options.component.html',
    styleUrls       : ['./interest-options.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentInterestOptions
{
    @Select(StateUser.isPublisher) isPublisher$: Observable<boolean>;

    public InterestType : any = InterestType;
    public EventType    : any = EventType;

    @Input() interestType : InterestType;
    @Input() eventType    : EventType;
    @Input() isStream     : boolean;

    constructor
    (
        private store:   Store,
        private popover: PopoverController
    )
    { }

    public filterChanged(event: CustomEvent): void
    {
        if (this.isStream)
        {
            this.store.dispatch(new ActionUserInterestTypeSet(event.detail.value));
        }
        else
        {
            this.store.dispatch(new ActionUserEventTypeSet(event.detail.value));
        }

        this.popover.dismiss();
    }
}
