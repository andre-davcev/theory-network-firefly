import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef
} from '@angular/core';

import { IconType, IconSize } from '../icon';
import { Color } from '../../enums';

@Component({
  selector: 'ff-icon-message',
  templateUrl: './icon-message.component.html',
  styleUrls: ['./icon-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentIconMessage {
  @Input()
  public gap: string = '1rem';

  @Input()
  public fill: boolean = true;

  @Input()
  public icon: IconType;

  @Input()
  public iconColor: Color = Color.Black;

  @Input()
  public iconBackground: Color = Color.Primary;

  @Input()
  public message: string;

  @Input()
  public messageColor: Color = Color.Black;

  @Input()
  @HostBinding('style.fontSize')
  public messageFontSize: string = '1rem';

  @Input()
  public messageTranslucent: boolean = false;

  @HostBinding('class')
  public get class(): string {
    const classes: Array<string> = [];

    this.classes.forEach((name: string) => classes.push(name));

    if (this.fill) {
      classes.push('cpt-fill');
    }

    if (this.messageTranslucent) {
      classes.push('cpt-message-translucent');
    }

    classes.push(`cpt-background-${this.iconBackground}`);
    classes.push(`cpt-message-${this.messageColor}`);

    return classes.join(' ');
  }

  public classes: Array<string> = [];

  public IconType: any = IconType;
  public IconSize: any = IconSize;
  public Color: any = Color;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.classList.forEach((name: string) =>
      this.classes.push(name)
    );
  }
}
