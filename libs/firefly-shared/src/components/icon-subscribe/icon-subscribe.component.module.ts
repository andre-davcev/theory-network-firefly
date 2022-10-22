import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentIconSubscribe } from './icon-subscribe.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule,
        FontAwesomeModule,
        FlexLayoutModule,
        TranslateModule
    ],

    declarations :
    [
        ComponentIconSubscribe
    ],

    exports :
    [
        ComponentIconSubscribe
    ]
})
export class ModuleComponentIconSubscribe
{

}
