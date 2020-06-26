import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { InterestType, ActionUserInterestTypeSet, EventType, ActionUserEventTypeSet, StateUser, StateUserInterests, ActionUserInterestsGetData, StateUserEvents, StateUserAlerts, ActionUserAlertsGetImages, ActionUserEventsGetData, ActionUserEventVirtualSet, ActionUserInterestVirtualSet } from '@firefly/core';
import { Store, Select } from '@ngxs/store';
import { PopoverController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile/state';
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
        if (this.isStream)
        {
            const interestType: InterestType = event.detail.value;

            if (interestType !== InterestType.Created || this.store.selectSnapshot(StateUserInterests.initialized()))
            {
                this.store.dispatch(new ActionUserInterestTypeSet(interestType)).
                pipe
                (
                    delay(1),
                    switchMap(() =>
                        from(this.popover.dismiss())
                    )
                ).
                subscribe();
            }
            else
            {
                this.store.dispatch(new ActionMobileLoadingShow()).
                pipe
                (
                    switchMap(() => from(this.popover.dismiss())),
                    switchMap(() => this.store.dispatch(new ActionUserInterestsGetData())),
                    switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                    switchMap(() => this.store.dispatch(new ActionUserInterestTypeSet(interestType)))
                ).
                subscribe();
            }
        }
        else
        {
            const eventType: EventType = event.detail.value;

            if (eventType === EventType.New)
            {
                this.store.dispatch(new ActionUserEventTypeSet(eventType)).
                pipe
                (
                    delay(1),
                    switchMap(() =>
                        from(this.popover.dismiss())
                    )
                ).
                subscribe();
            }
            else if (eventType === EventType.Upcoming)
            {
                if (this.store.selectSnapshot(StateUserAlerts.empty()) || this.store.selectSnapshot(StateUserAlerts.alerts)[0].metadata.image != null)
                {
                    this.store.dispatch(new ActionUserEventTypeSet(eventType)).
                    pipe
                    (
                        delay(1),
                        switchMap(() =>
                            from(this.popover.dismiss())
                        )
                    ).
                    subscribe();
                }
                else
                {
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => from(this.popover.dismiss())),
                        switchMap(() => this.store.dispatch(new ActionUserAlertsGetImages())),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                        switchMap(() => this.store.dispatch(new ActionUserEventTypeSet(eventType)))
                    ).
                    subscribe();
                }
            }
            else if (eventType === EventType.Created)
            {
                if (this.store.selectSnapshot(StateUserEvents.initialized()))
                {
                    this.store.dispatch(new ActionUserEventTypeSet(eventType)).
                    pipe
                    (
                        delay(1),
                        switchMap(() =>
                            from(this.popover.dismiss())
                        )
                    ).
                    subscribe();
                }
                else
                {
                    this.store.dispatch(new ActionMobileLoadingShow()).
                    pipe
                    (
                        switchMap(() => from(this.popover.dismiss())),
                        switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
                        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                        switchMap(() => this.store.dispatch(new ActionUserEventTypeSet(eventType)))
                    ).
                    subscribe();
                }
            }
        }
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
