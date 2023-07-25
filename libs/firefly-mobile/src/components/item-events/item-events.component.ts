import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { from } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Alert, DateEvents, Event } from '@firefly/cloud';
import { TimestampFormat } from '@theory/firebase';

@Component({
  selector: 'ff-item-events',
  templateUrl: './item-events.component.html',
  styleUrls: ['./item-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentItemEvents {
  @Input()
  public dateEvents!: DateEvents;

  @Input()
  public showDelete: boolean = false;

  @Output()
  public selected: EventEmitter<Event | Alert> = new EventEmitter();

  @Output()
  public deleted: EventEmitter<Event | Alert> = new EventEmitter();

  public TimestampFormat: any = TimestampFormat;

  public select(event: Event | Alert, sliding: IonItemSliding): void {
    from(sliding.closeOpened())
      .pipe(
        filter((closed: boolean) => !closed),
        tap(() => this.selected.next(event))
      )
      .subscribe();
  }

  public delete(event: Event): void {
    if (!event.notifyComplete) {
      this.deleted.next(event);
    }
  }
}
