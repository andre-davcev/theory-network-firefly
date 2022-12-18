import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

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
    imports: [ CommonModule ],
    declarations : [NavComponent],
    exports      : [NavComponent]
})
export class NavComponentModule {}
