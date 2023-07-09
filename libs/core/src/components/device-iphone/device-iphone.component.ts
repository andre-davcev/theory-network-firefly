import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'tn-device-iphone',
  templateUrl: './device-iphone.component.html',
  styleUrls: ['./device-iphone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceIPhoneComponent {
  @Input()
  public url: string;
}

@NgModule({
  imports: [CommonModule],
  declarations: [DeviceIPhoneComponent],
  exports: [DeviceIPhoneComponent]
})
export class DeviceIPhoneComponentModule {}
