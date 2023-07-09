import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Color } from '../../enums';

@Component({
  selector: 'ff-icon-firefly',
  templateUrl: './icon-firefly.component.html',
  styleUrls: ['./icon-firefly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentIconFirefly {
  @HostBinding('class.cpt-animate')
  @Input()
  public animate: boolean = false;

  @Input()
  public color: Color = Color.Primary;

  @HostBinding('class.cpt-color-primary')
  public get colorPrimary(): boolean {
    return this.color === Color.Primary;
  }

  @HostBinding('class.cpt-color-white')
  public get colorWhite(): boolean {
    return this.color === Color.White;
  }
}
