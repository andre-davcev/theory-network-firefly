import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
}

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: PrivacyComponent}])]
})
export class PrivacyComponentModule {}
