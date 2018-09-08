import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PageAssetsIcon } from './assets-icon.page';
import { ModuleComponentItemHeader } from '../../components/item-header/item-header.component.module';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ReactiveFormsModule,
        ModulePage,
        ModuleComponentItemHeader
    ],

    declarations :
    [
        PageAssetsIcon
    ]
})

export class ModulePageAssetsIcon { }
