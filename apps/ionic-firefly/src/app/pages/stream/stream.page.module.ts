import { NgModule } from '@angular/core';

import { PageStream } from './stream.page';
import { ModuleComponentIcon } from '../../components/icon/icon.component.module';
import { ModulePage } from '../page.module';

@NgModule
({
    imports :
    [
        ModulePage,
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
