import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, NgModule } from '@angular/core';

import { Color, ModuleComponentIconFirefly } from '@firefly/shared';

@Component({
  selector: 'ff-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public Color: any = Color;

  @HostBinding('class')
  public get classes(): string {
    return 'w-full flex grow justify-between pt-16 pl-20 pr-20';
  }
}

@NgModule
({
    imports: [ CommonModule, ModuleComponentIconFirefly ],
    declarations : [NavComponent],
    exports      : [NavComponent]
})
export class NavComponentModule {}
