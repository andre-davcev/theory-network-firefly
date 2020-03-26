import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { InterestType, ActionUserInterestTypeSet } from '@firefly/core';
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
    public InterestType: any = InterestType;

    @Input() interestType: InterestType;

    constructor
    (
        private store:   Store,
        private popover: PopoverController
    )
    { }

    public filterChanged(event: CustomEvent): void
    {
        this.store.dispatch(new ActionUserInterestTypeSet(event.detail.value));

        this.popover.dismiss();
    }
}
