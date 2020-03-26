import { Component, ChangeDetectionStrategy } from '@angular/core';

import { InterestType } from '@firefly/core';

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

    public filterChanged(event: CustomEvent): void
    {
        console.log(event.detail.value);
    }
}
