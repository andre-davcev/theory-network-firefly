import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule
} from '@angular/core';
import { StyleColor, StyleSize } from '../../enums';

@Component({
  selector: 'ff-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  @Input()
  public size: StyleSize = StyleSize.Large;

  @Input()
  public color: StyleColor = StyleColor.Dark;

  @HostBinding('class')
  public get classes(): string {
    return `cpt-style-size-${this.size} cpt-style-color-${this.color}`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [NavComponent],
  exports: [NavComponent]
})
export class NavComponentModule {}
