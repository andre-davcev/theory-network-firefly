import { Component, ChangeDetectionStrategy, NgModule, Input } from '@angular/core';

@Component
({
    selector        : 'tn-app-store-ios',
    templateUrl     : './app-store-ios.component.html',
    styleUrls       : ['./app-store-ios.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppStoreIosComponent {
  @Input()
  public url: string;
}


@NgModule
({
    declarations: [AppStoreIosComponent],
    exports: [AppStoreIosComponent]
})
export class AppStoreIosComponentModule { }
