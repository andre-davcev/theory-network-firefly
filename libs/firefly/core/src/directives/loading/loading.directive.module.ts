import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentLoading } from './loading.component';
import { DirectiveLoading } from './loading.directive';
import { ModuleComponentIconFirefly } from '@firefly/core/components';

@NgModule
({
    imports:
    [
        CommonModule,
        ModuleComponentIconFirefly
    ],

    declarations :
    [
        ComponentLoading,
        DirectiveLoading
    ],

    entryComponents:
    [
        ComponentLoading
    ],

    exports:
    [
        ComponentLoading,
        DirectiveLoading
    ]
})
export class ModuleDirectiveLoading { }
