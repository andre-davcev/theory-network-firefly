import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponentModule } from '@firefly/web';
import { AppStoreIosComponentModule } from '@theory/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @HostBinding('class')
  public get classes(): string {
    return 'w-full';
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, NavComponentModule, AppStoreIosComponentModule, RouterModule.forChild([{ path: '', component: HomeComponent}])]
})
export class HomeComponentModule {}

