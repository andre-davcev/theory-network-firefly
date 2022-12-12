import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ModuleComponentLogo } from '@firefly/shared';

@Component({
  selector: 'ff-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
}

@NgModule
({
    imports: [ CommonModule, ModuleComponentLogo],
    declarations : [NavComponent],
    exports      : [NavComponent]
})
export class NavComponentModule { }
