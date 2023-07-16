import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ff-icon-subscribe',
  templateUrl: './icon-subscribe.component.html',
  styleUrls: ['./icon-subscribe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentIconSubscribe {
  @HostBinding('class.cpt-subscribed')
  @Input()
  public subscribed: boolean = false;

  @Input()
  public count!: number;

  @Input()
  public on: boolean = false;

  @Output()
  public clicked: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public clickedOn: EventEmitter<boolean> = new EventEmitter();

  public faThumbtack: IconDefinition = faThumbtack;

  public toggle(): void {
    // this.subscribed = !this.subscribed;

    this.clicked.next(this.subscribed);
  }

  public toggleOn(event: any): void {
    const on: boolean = event.detail.checked;

    this.on = on;

    this.clickedOn.next(this.on);
  }
}
