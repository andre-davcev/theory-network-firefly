import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'ff-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeIconComponent {
  @Input()
  public link: boolean = false;
}

@NgModule({
  imports: [CommonModule],
  declarations: [HomeIconComponent],
  exports: [HomeIconComponent]
})
export class HomeIconComponentModule {}
