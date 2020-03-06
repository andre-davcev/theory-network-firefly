import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages, ActionMobileNavigateRoot, ActionMobileAuthSelect } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { CoreEnum, BaseComponent } from '@theory/core';
import { StateMobile } from '@firefly/mobile';
import { Observable, from } from 'rxjs';
import { StateUserAlerts, StateUser } from '@firefly/core';
import { take, switchMap } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome extends BaseComponent
{
    @Select(StateMobile.menuOpen)        menuOpen$      : Observable<boolean>;
    @Select(StateMobile.pageAlerts)      pageAlerts$    : Observable<boolean>;
    @Select(StateMobile.pageStream)      pageStream$    : Observable<boolean>;
    @Select(StateUserAlerts.unreadCount) unread$        : Observable<number>;
    @Select(StateUserAlerts.hasUnread)   hasUnread$     : Observable<boolean>;
    @Select(StateUser.authenticated)     authenticated$ : Observable<boolean>;

    public Pages : any = Pages;

    constructor
    (
        private menu  : MenuController,
        private store : Store
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(type: Pages): void
    {
        const url: Array<any> = type === Pages.AssetEvent ? [ type, CoreEnum.IdNew ] : [ type ];

        this.store.dispatch(new Navigate(url));
    }

    public go(type: Pages.Alert | Pages.Stream): void
    {
        this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, type));
    }

    public menuOpen(): void
    {
        this.authenticated$.pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    from(this.menu.open()) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }
}
