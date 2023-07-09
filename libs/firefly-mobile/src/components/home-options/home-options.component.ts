import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PopoverController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

import {
  InterestType,
  EventType,
  StateUser,
  ActionInterestsSetVirtual,
  ActionCalendarSetVirtual,
  ActionInterestsSetType,
  ActionCalendarSetType
} from '@firefly/shared';

@Component({
  selector: 'ff-interest-options',
  templateUrl: './home-options.component.html',
  styleUrls: ['./home-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHomeOptions {
  @Select(StateUser.isPublisher) isPublisher$: Observable<boolean>;

  public InterestType: any = InterestType;
  public EventType: any = EventType;

  @Input() interestType: InterestType;
  @Input() eventType: EventType;
  @Input() isStream: boolean;
  @Input() virtual: boolean;

  constructor(private store: Store, private popover: PopoverController) {}

  public filterChanged(event: CustomEvent): void {
    const action: any = this.isStream
      ? new ActionInterestsSetType(event.detail.value)
      : new ActionCalendarSetType(event.detail.value);

    this.store
      .dispatch(action)
      .pipe(
        delay(1),
        switchMap(() => from(this.popover.dismiss()))
      )
      .subscribe();
  }

  public virtualChanged(event: CustomEvent): void {
    const virtual: boolean = event.detail.checked;

    this.store.dispatch(
      this.isStream
        ? new ActionInterestsSetVirtual(virtual)
        : new ActionCalendarSetVirtual(virtual)
    );
  }
}
