import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulePage } from '@firefly/app/modules';
import { PageAlertDetail } from './alert-detail.page';
import { RoutesPageAlertDetail } from './alert-detail.page.routes';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ModuleComponentItemMap } from '@firefly/mobile';

@NgModule
({
    imports :
    [
        ModulePage,
        ModuleComponentItemMap,
        RouterModule.forChild(RoutesPageAlertDetail),
        NgxsFormPluginModule
    ],

    declarations : [PageAlertDetail],
    exports : [PageAlertDetail],
    entryComponents:
    [

    ]
})

export class ModulePageAlertDetail { }
