import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ff-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeIconComponent {

}

@NgModule
({
    imports: [ CommonModule ],
    declarations : [HomeIconComponent],
    exports      : [HomeIconComponent]
})
export class HomeIconComponentModule {}
