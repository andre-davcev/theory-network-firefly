import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentIconSubscribe } from './icon-subscribe.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

@NgModule
({
    imports :
    [
        CommonModule,
        IonicModule,
        FontAwesomeModule
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
