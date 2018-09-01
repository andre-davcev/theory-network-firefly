import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentItemHeader } from './item-header.component';

@NgModule
({
    imports :
    [
        CommonModule,
        ReactiveFormsModule
    ],

    declarations : [ComponentItemHeader],
    exports      : [ComponentItemHeader]
})
export class ModuleItemHeader { }
