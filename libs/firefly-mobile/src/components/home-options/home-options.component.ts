import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import {
  ActionCalendarSetType,
  ActionCalendarSetVirtual,
  ActionListsSetVirtual,
  EventType,
  StateUser
} from '@firefly/shared';

@Component({
  selector: 'ff-list-options',
  templateUrl: './home-options.component.html',
  styleUrls: ['./home-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHomeOptions {
  @Select(StateUser.isPublisher) isPublisher$!: Observable<boolean>;

  public EventType: any = EventType;

  @Input() eventType!: EventType;
  @Input() isStream!: boolean;
  @Input() virtual!: boolean;

  constructor(private store: Store, private popover: PopoverController) {}

  public filterChanged(event: CustomEvent): void {
    const action: any = this.isStream
      ? of(null)
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
        ? new ActionListsSetVirtual(virtual)
        : new ActionCalendarSetVirtual(virtual)
    );
  }
}
