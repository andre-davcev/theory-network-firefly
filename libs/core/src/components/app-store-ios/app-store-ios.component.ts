import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component
({
    selector        : 'tn-app-store-ios',
    templateUrl     : './app-store-ios.component.html',
    styleUrls       : ['./app-store-ios.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppStoreIosComponent {
}


@NgModule
({
    declarations: [AppStoreIosComponent],
    exports: [AppStoreIosComponent]
})
export class AppStoreIosComponentModule { }
