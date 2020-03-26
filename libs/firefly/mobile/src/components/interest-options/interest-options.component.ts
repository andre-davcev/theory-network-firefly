import { Component, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';

import { InterestType, ActionUserInterestTypeSet } from '@firefly/core';
import { Store } from '@ngxs/store';

@Component
({
    selector        : 'app-interest-options',
    templateUrl     : './interest-options.component.html',
    styleUrls       : ['./interest-options.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentInterestOptions implements OnDestroy
{
    public InterestType: any = InterestType;

    @Input() interestType: InterestType;

    constructor
    (
        private store: Store
    )
    { }

    public filterChanged(event: CustomEvent): void
    {
        this.interestType = event.detail.value;
    }

    public ngOnDestroy(): void
    {
        this.store.dispatch(new ActionUserInterestTypeSet(this.interestType));
    }
}
