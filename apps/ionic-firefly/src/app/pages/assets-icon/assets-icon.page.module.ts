import { NgModule } from '@angular/core';

import { PageAssetsIcon } from './assets-icon.page';
import { ModuleComponentItemHeader } from '../../components/item-header/item-header.component.module';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentItemHeader
    ],

    declarations :
    [
        PageAssetsIcon
    ]
})

export class ModulePageAssetsIcon { }
