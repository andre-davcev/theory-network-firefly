import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { PageAssetsIcon } from './assets-icon.page';
import { ModuleComponentItemHeader } from '../../components/item-header/item-header.component.module';

@NgModule
({
    imports :
    [
        ModuleComponentItemHeader,
        TranslateModule
    ],

    declarations :
    [
        PageAssetsIcon
    ]
})

export class ModulePageAssetsIcon { }
