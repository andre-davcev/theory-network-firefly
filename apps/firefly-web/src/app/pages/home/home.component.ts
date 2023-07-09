import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  NgModule
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeIconComponentModule, NavComponentModule } from '@firefly/web';
import {
  AppStoreGoogleComponentModule,
  AppStoreIosComponentModule,
  DeviceIPhoneComponentModule
} from '@theory/core';
import { Link } from '../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @HostBinding('class')
  public get classes(): string {
    return 'w-full';
  }

  public Link = Link;

  public get year(): number {
    return new Date().getFullYear();
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NavComponentModule,
    HomeIconComponentModule,
    AppStoreIosComponentModule,
    AppStoreGoogleComponentModule,
    DeviceIPhoneComponentModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ]
})
export class HomeComponentModule {}
