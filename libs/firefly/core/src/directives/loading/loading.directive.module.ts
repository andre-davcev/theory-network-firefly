import { NgModule } from '@angular/core';

import { ModuleComponentLoading, ComponentLoading } from '@firefly/core/components';

import { DirectiveLoading } from './loading.directive';

@NgModule
({
    imports:
    [
        ModuleComponentLoading
    ],

    declarations :
    [
        DirectiveLoading
    ],

    entryComponents:
    [
        ComponentLoading
    ],

    exports:
    [
        DirectiveLoading
    ]
})
export class ModuleDirectiveLoading { }
