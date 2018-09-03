import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { PageStream } from './stream.page';
import { ModuleComponentIcon } from '../../components/icon/icon.component.module';

@NgModule
({
    imports :
    [
        CommonModule,
        TranslateModule,
        IonicModule,
        ModuleComponentIcon
    ],

    declarations :
    [
        PageStream
    ]
})

export class ModulePageStream
{

}
