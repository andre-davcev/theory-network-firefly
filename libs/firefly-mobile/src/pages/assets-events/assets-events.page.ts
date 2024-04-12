import { Component, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { MenuController } from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Event } from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  IconType,
  Pages,
  StateUserEvents
} from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent, CoreEnum } from '@theory/core';
import { StateStorage, StorageImage, TimestampFormat } from '@theory/firebase';
import { StateMobile } from '../../state';

@Component({
  selector: 'app-page-assets-events',
  templateUrl: 'assets-events.page.html',
  styleUrls: ['./assets-events.page.scss']
})
export class PageAssetsEvents extends BaseComponent implements OnInit {
  @Select(StateUserEvents.data()) events$!: Observable<Array<Event>>;
  @Select(StateUserEvents.found()) found$!: Observable<boolean>;
  @Select(StateUserEvents.empty()) empty$!: Observable<boolean>;
  @Select(StateStorage.images) images$!: Observable<
    Record<string, StorageImage>
  >;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;

  public images: Record<string, StorageImage> = {};

  public IconType: any = IconType;
  public TimestampFormat: any = TimestampFormat;

  constructor(private store: Store, private menu: MenuController) {
    super();
  }

  public ngOnInit(): void {
    this.images$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (images: Record<string, StorageImage>) => (this.images = images)
      );
  }

  add(): void {
    this.store.dispatch(
      new Navigate([
        Pages.Tabs,
        Pages.Events,
        Pages.EventDetail,
        CoreEnum.IdNew
      ])
    );
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public select(object: Event): void {
    this.store.dispatch([
      new ActionAppLoadingShow(),
      new Navigate([Pages.Tabs, Pages.Events, Pages.EventDetail, object.id])
    ]);
    //this.store.dispatch(new ActionEventSetId(object.id));
  }

  public menuOpen(): void {
    this.menu.open();
  }
}
