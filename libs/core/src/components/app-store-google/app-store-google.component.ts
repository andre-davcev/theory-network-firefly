import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule
} from '@angular/core';

@Component({
  selector: 'tn-app-store-google',
  templateUrl: './app-store-google.component.html',
  styleUrls: ['./app-store-google.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppStoreGoogleComponent {
  @Input()
  public url!: string;

  public navigate(url: string): void {
    window.open(url);
  }
}

@NgModule({
  declarations: [AppStoreGoogleComponent],
  exports: [AppStoreGoogleComponent]
})
export class AppStoreGoogleComponentModule {}
