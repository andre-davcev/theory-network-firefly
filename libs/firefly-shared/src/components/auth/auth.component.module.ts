import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentAuth } from './auth.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
