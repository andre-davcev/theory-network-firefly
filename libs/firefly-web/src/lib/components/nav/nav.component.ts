import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

import { Color, ModuleComponentIconFirefly } from '@firefly/shared';

@Component({
  selector: 'ff-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public Color: any = Color;
}

@NgModule
({
    imports: [ CommonModule, ModuleComponentIconFirefly ],
    declarations : [NavComponent],
    exports      : [NavComponent]
})
export class NavComponentModule {}
