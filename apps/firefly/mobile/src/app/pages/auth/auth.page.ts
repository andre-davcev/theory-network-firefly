import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { StateApp } from '@firefly/core';
import { ActionDeviceStatusBarShow, ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '@firefly/mobile';
import { StatusBarStyle } from '@capacitor/core';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-auth',
    templateUrl : 'auth.page.html',
    styleUrls   : ['./auth.page.scss']
})

export class PageAuth implements OnInit
{
    @Select(StateApp.initialized) initialized$: Observable<boolean>;

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
                this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]))
            )
        ).
        subscribe();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({ style: StatusBarStyle.Light }));
    }
}
