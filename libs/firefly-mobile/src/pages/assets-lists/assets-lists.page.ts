import { Component, Input, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { MenuController, ModalController } from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { List } from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  ActionEventListAdd,
  ActionListSetId,
  IconType,
  Pages,
  StateUserLists
} from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { StateStorage, StorageImage } from '@theory/firebase';

import { StateMobile } from '../../state';

@Component({
  selector: 'app-page-assets-lists',
  templateUrl: 'assets-lists.page.html',
  styleUrls: ['./assets-lists.page.scss']
})
export class PageAssetsLists extends BaseComponent implements OnInit {
  @Select(StateUserLists.data()) list$!: Observable<Array<List>>;
  @Select(StateUserLists.found()) found$!: Observable<boolean>;
  @Select(StateUserLists.empty()) empty$!: Observable<boolean>;
  @Select(StateStorage.images) images$!: Observable<
    Record<string, StorageImage>
  >;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;

  @Input() modal: boolean = false;

  public IconType: any = IconType;

  public images: Record<string, StorageImage> = {};

  constructor(
    private store: Store,
    private modalController: ModalController,
    private menu: MenuController
  ) {
    super();
  }

  public ngOnInit(): void {
    this.images$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (images: Record<string, StorageImage>) => (this.images = images)
      );
  }

  public ionViewWillEnter() {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public add(): void {
    this.store.dispatch(
      new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetList])
    );
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  public select(list: List): void {
    /*this.store.dispatch(new ActionListSetId(list.id)).pipe(
          switchMap(() => this.store.dispatch(new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetList], {queryParams: {id: list.id}}, {state: {isListDetail:true}})))
        );*/

    if (this.modal) {
      this.store.dispatch([
        new ActionListSetId(list.id),
        new ActionEventListAdd(list)
      ]);

      this.modalController.dismiss();
    } else {
      this.store.dispatch([
        new ActionAppLoadingShow(),
        new Navigate(
          [Pages.Tabs, Pages.Lists, Pages.AssetList],
          { id: list.id },
          { state: { isListDetail: true } }
        )
      ]);
    }
  }

  public menuOpen(): void {
    this.menu.open();
  }
}
