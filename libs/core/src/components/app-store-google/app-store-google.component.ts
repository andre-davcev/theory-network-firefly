import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component
({
    selector        : 'tn-app-store-google',
    templateUrl     : './app-store-google.component.html',
    styleUrls       : ['./app-store-google.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppStoreGoogleComponent {
}


@NgModule
({
    declarations: [AppStoreGoogleComponent],
    exports: [AppStoreGoogleComponent]
})
export class AppStoreGoogleComponentModule { }
