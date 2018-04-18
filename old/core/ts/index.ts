///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import {NgModule}            from '@angular/core';
import {ModuleWithProviders} from '@angular/core';

import {ModuleIconFirefly} from './components/firefly/firefly.component.module';

export {ModuleIconFirefly} from './components/firefly/firefly.component.module';
export {IconFirefly}       from './components/firefly/firefly.component';

@NgModule
({
    imports :
    [
        ModuleIconFirefly
    ],

    declarations : [],
    
    exports :
    [
        ModuleIconFirefly
    ]
})

export class ModuleFireflyCore
{

}