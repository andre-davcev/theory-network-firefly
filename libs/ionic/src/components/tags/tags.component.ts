import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'tn-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent {}

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsComponentModule {}
