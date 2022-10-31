import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBarStyle } from '@capacitor/core';
import { MenuController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StorageImage, StateStorage, TimestampFormat } from '@theory/firebase';
import { BaseComponent, CoreEnum } from '@theory/core';
import { StateUserEvents, IconType, ActionAppLoadingShow } from '@firefly/shared';
import { Event } from '@firefly/cloud';
import { Pages, StateMobile } from '@firefly/mobile';

@Component
({
    selector    : 'app-page-assets-events',
    templateUrl : 'assets-events.page.html',
    styleUrls   : ['./assets-events.page.scss']
})

export class PageAssetsEvents extends BaseComponent implements OnInit
{
    @Select(StateUserEvents.data())  events$:   Observable<Array<Event>>;
    @Select(StateUserEvents.found()) found$:    Observable<boolean>;
    @Select(StateUserEvents.empty()) empty$:    Observable<boolean>;
    @Select(StateStorage.images)     images$:   Observable<Record<string, StorageImage>>;
    @Select(StateMobile.menuOpen)    menuOpen$: Observable<boolean>

    public images: Record<string, StorageImage> = {};

    public IconType: any = IconType;
    public TimestampFormat: any = TimestampFormat;

    constructor
    (
        private store : Store,
        private menu  : MenuController
    )
    {
      super();
    }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    add(): void
    {
        this.store.dispatch(new Navigate([ Pages.EventDetail, CoreEnum.IdNew ]));
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public select(object: Event): void
    {
        this.store.dispatch([
          new ActionAppLoadingShow(),
          new Navigate([Pages.EventDetail, object.id])
        ]);
        //this.store.dispatch(new ActionEventSetId(object.id));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
