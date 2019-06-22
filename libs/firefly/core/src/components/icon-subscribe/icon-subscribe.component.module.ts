import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentIconSubscribe } from './icon-subscribe.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule,
        FontAwesomeModule,
        FlexLayoutModule
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
    constructor()
    {
        library.add(faThumbtack);
    }
}
