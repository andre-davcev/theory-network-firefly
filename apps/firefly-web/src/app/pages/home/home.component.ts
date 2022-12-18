import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponentModule } from '@firefly/web';

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
  imports: [CommonModule, NavComponentModule, RouterModule.forChild([{ path: '', component: HomeComponent}])]
})
export class HomeComponentModule {}

