import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentItemHeader } from './item-header.component';
import { ReactiveFormsModule } from '@angular/forms';

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
