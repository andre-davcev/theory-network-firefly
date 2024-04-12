import { Component, Input, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { MenuController, ModalController } from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Interest } from '@firefly/cloud';
import {
  ActionAppLoadingShow,
  ActionEventInterestAdd,
  ActionInterestSetId,
  IconType,
  Pages,
  StateUserInterests
} from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { StateStorage, StorageImage } from '@theory/firebase';

import { StateMobile } from '../../state';

@Component({
  selector: 'app-page-assets-interests',
  templateUrl: 'assets-interests.page.html',
  styleUrls: ['./assets-interests.page.scss']
})
export class PageAssetsInterests extends BaseComponent implements OnInit {
  @Select(StateUserInterests.data()) list$!: Observable<Array<Interest>>;
  @Select(StateUserInterests.found()) found$!: Observable<boolean>;
  @Select(StateUserInterests.empty()) empty$!: Observable<boolean>;
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
      new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetInterest])
    );
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  public select(interest: Interest): void {
    /*this.store.dispatch(new ActionInterestSetId(interest.id)).pipe(
          switchMap(() => this.store.dispatch(new Navigate([Pages.Tabs, Pages.Lists, Pages.AssetInterest], {queryParams: {id: interest.id}}, {state: {isInterestDetail:true}})))
        );*/

    if (this.modal) {
      this.store.dispatch([
        new ActionInterestSetId(interest.id),
        new ActionEventInterestAdd(interest)
      ]);

      this.modalController.dismiss();
    } else {
      this.store.dispatch([
        new ActionAppLoadingShow(),
        new Navigate(
          [Pages.Tabs, Pages.Lists, Pages.AssetInterest],
          { id: interest.id },
          { state: { isInterestDetail: true } }
        )
      ]);
    }
  }

  public menuOpen(): void {
    this.menu.open();
  }
}
