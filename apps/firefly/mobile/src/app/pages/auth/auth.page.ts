import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { StateUser } from '@firefly/core';
import { ActionDeviceStatusBarShow, ActionDeviceStatusBarSet } from '@theory/capacitor';
import { ActionMobileNavigateRoot, Pages } from '@firefly/mobile';
import { StatusBarStyle } from '@capacitor/core';

@Component
({
    selector    : 'app-page-auth',
    templateUrl : 'auth.page.html',
    styleUrls   : ['./auth.page.scss']
})

export class PageAuth implements OnInit
{
    @Select(StateUser.initialized) initialized$: Observable<boolean>;

    constructor
    (
        private store : Store,
    ) { }

    public ngOnInit(): void
    {
        from(this.store.dispatch(new ActionDeviceStatusBarShow())).
        pipe
        (
            switchMap(() =>
                this.initialized$
            ),
            filter((initialized: boolean) => initialized),
            switchMap(() =>
                this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, Pages.Stream))
            )
        ).
        subscribe();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({ style: StatusBarStyle.Light }));
    }
}
