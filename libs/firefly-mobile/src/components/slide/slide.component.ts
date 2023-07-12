import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import { Alert } from '@firefly/cloud';
import { TimestampFormat } from '@theory/firebase';

@Component({
  selector: 'ff-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSlide {
  @Input() slide: Alert;
  @Input() buttonText: string;
  @Input() routerLink: string;
  @Input() deleteShow: boolean = false;

  @Output() alertGoClicked: EventEmitter<void> = new EventEmitter();
  @Output() alertDetailClicked: EventEmitter<void> = new EventEmitter();
  @Output() alertDeleteClicked: EventEmitter<void> = new EventEmitter();

  private inProgress: boolean = false;

  public TimestampFormat: any = TimestampFormat;

  @HostListener('click')
  public clickedAlertDetail(): void {
    if (this.inProgress) {
      this.inProgress = false;
    } else {
      this.alertDetailClicked.next();
    }
  }

  public clickedAlertGo(): void {
    this.inProgress = true;

    this.alertGoClicked.next();
  }

  public clickedAlertDelete(): void {
    this.inProgress = true;

    this.alertDeleteClicked.next();
  }
}
