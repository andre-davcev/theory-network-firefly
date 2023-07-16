import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { Color } from '../../enums';
import { IconFamily } from './icon-family.enum';
import { IconSize } from './icon-size.enum';
import { IconSlot } from './icon-slot.enum';
import { IconType } from './icon-type.enum';

@Component({
  selector: 'ff-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentIcon implements OnInit {
  @Input()
  public active: boolean = true;

  @Input()
  public visible: boolean = true;

  @Input()
  public name!: IconType;

  @Input()
  public color: Color = Color.Black;

  @Input()
  public size: IconSize = IconSize.Small;

  @Input()
  public outline: boolean = false;

  @Input()
  public slot!: IconSlot;

  public icon!: string;
  public definition!: IconDefinition;
  public family: IconFamily = IconFamily.Custom;
  public classes: Array<string> = [];

  public IconFamily: any = IconFamily;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.classList.forEach((name: string) =>
      this.classes.push(name)
    );
  }

  @HostBinding('class')
  public get class(): string {
    const classes: Array<string> = [];

    this.classes.forEach((name: string) => classes.push(name));

    if (this.active) {
      classes.push('cpt-active');
    }

    if (this.visible) {
      classes.push('cpt-visible');
    }

    if (this.name != null) {
      const outline: string = this.outline ? '-outline' : '';

      this.icon = `${this.name}${outline}`;

      classes.push(`cpt-name-${this.icon}`);
    }

    this.family =
      this.name === IconType.Interests ? IconFamily.Custom : IconFamily.Ionic;

    classes.push(`cpt-family-${this.family}`);
    classes.push(`cpt-color-${this.color}`);
    classes.push(`cpt-size-${this.size}`);

    return classes.join(' ');
  }
}
