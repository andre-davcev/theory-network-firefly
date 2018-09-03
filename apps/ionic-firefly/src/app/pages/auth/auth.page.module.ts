import { NgModule } from '@angular/core';

import { PageLogin } from './auth.page';
import { ModulePage } from '../page.module';
import { ModuleComponentIconFirefly } from '../../components/icon-firefly/icon-firefly.component.module';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentIconFirefly
    ],

    declarations : [PageLogin]
})

export class ModulePageLogin { }
