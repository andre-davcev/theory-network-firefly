import {Component} from '@angular/core';
import { IconType, Color } from '@firefly/core';
import { Select, Store } from '@ngxs/store';
import { StateMobile } from '@firefly/mobile';
import { Observable } from 'rxjs';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { MenuController } from '@ionic/angular';

@Component
({
    selector    : 'app-page-user-profile',
    templateUrl : 'user-profile.page.html',
    styleUrls   : ['./user-profile.page.scss']
})

export class PageUserProfile
{
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    public IconType : any = IconType;
    public Color    : any = Color;

    constructor
    (
        private menu  : MenuController,
        private store : Store
    )
    { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
