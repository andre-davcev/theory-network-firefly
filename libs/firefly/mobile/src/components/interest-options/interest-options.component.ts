import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { InterestType, ActionUserInterestTypeSet, EventType, ActionUserEventTypeSet } from '@firefly/core';
import { Store } from '@ngxs/store';
import { PopoverController } from '@ionic/angular';

@Component
({
    selector        : 'app-interest-options',
    templateUrl     : './interest-options.component.html',
    styleUrls       : ['./interest-options.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentInterestOptions
{
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
