import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { StatusBarStyle } from '@capacitor/core';
import { Observable } from 'rxjs';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages, StateMobile } from '@firefly/mobile';
import { IconType, IconSize, Color } from '@firefly/shared';

@Component
({
    selector    : 'app-page-categories',
    templateUrl : 'categories.page.html',
    styleUrls   : ['./categories.page.scss']
})

export class PageCategories
{
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    public Pages : any = Pages;

    public IconType : any = IconType;
    public IconSize : any = IconSize;
    public Color    : any = Color;

    constructor
    (
        private menu  : MenuController,
        private store : Store
    )
    { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public navigate(page: Pages): void
    {
        this.store.dispatch(new Navigate([ page ]));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
