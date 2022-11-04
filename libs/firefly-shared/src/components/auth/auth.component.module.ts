import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentAuth } from './auth.component';

@NgModule
({
    imports:
    [
        CommonModule,
        TranslateModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        IonicModule,
        FontAwesomeModule
    ],
    declarations: [ComponentAuth],
    exports: [ComponentAuth]
})
export class ModuleComponentAuth { }
