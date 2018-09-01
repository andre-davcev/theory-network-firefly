import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

const modules =
[
    TranslateModule
];

@NgModule
({
    imports : modules,
    exports : modules
})

export class ModulePage { }
