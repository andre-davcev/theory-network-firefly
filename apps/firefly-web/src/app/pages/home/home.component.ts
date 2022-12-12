import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,  RouterModule.forChild([{ path: '', component: HomeComponent}])]
})
export class HomeComponentModule {}

