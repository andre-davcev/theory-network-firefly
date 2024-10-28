import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Style } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { Event } from '@firefly/cloud';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionCityStreamGet,
  ActionListPatchMetadata,
  ActionListSave,
  ActionUserEventsGetData,
  Pages,
  StateApp,
  StateList,
  StateLists,
  StateUserEvents,
  TagList,
  TagListDefault,
  Translation
} from '@firefly/shared';
import {
  ActionDeviceStatusBarSet,
  ServiceCamera,
  StateDevice
} from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { StateStorage, StorageImage, TimestampFormat } from '@theory/firebase';
import { ActionMobileToast } from '../../state';

@Component({
  selector: 'app-page-asset-list',
  templateUrl: 'asset-list.page.html',
  styleUrls: ['./asset-list.page.scss']
})
export class PageAssetList extends BaseComponent implements OnInit {
  @Select(StateList.formGroup()) form$!: Observable<
    UntypedFormGroup | null | undefined
  >;
  @Select(StateList.isNew()) isNew$!: Observable<boolean>;
  @Select(StateList.canUpdate()) canUpdate$!: Observable<boolean>;
  @Select(StateList.events) events$!: Observable<Event[]>;
  @Select(StateList.private) private$!: Observable<boolean>;
  @Select(StateList.image) image$!: Observable<string>;
  @Select(StateStorage.images) images$!: Observable<
    Record<string, StorageImage>
  >;
  @Select(StateDevice.device) device$!: Observable<boolean>;
  @Select(StateUserEvents.initialized())
  stateUserInitialized$!: Observable<boolean>;

  public Pages: any = Pages;
  public TimestampFormat: any = TimestampFormat;
  public images: Record<string, StorageImage> = {};

  constructor(
    private store: Store,
    private navController: NavController,
    private camera: ServiceCamera,
    private translate: TranslateService
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

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public add(page: Pages.IconSelector | Pages.EventSelector) {
    //this.store.dispatch(new Navigate([ Pages.Tabs, Pages.Lists, Pages.EventDetail, CoreEnum.IdNew ]));
    /*
      if(page === Pages.IconSelector)
      {
        from(this.modal.create({
          component: PageIconSelector
        })).
        subscribe((modal: HTMLIonModalElement) => modal.present());
      }
      else{
        from(this.modal.create({
          component: PageEventSelector
        })).
        subscribe((modal: HTMLIonModalElement) => modal.present());
      }
*/
  }

  public save(): void {
    const tagKey: TagList = this.store.selectSnapshot(StateLists.tagKey);
    const isNew: boolean = this.store.selectSnapshot(StateList.isNew());

    this.translate
      .get([
        Translation.PageListCreatedSuccess,
        Translation.PageListCreatedError,
        Translation.PageListUpdateSuccess,
        Translation.PageListUpdateError
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.store
            .dispatch([new ActionAppLoadingShow(), new ActionListSave()])
            .pipe(
              map(() =>
                isNew
                  ? translations[Translation.PageListCreatedSuccess]
                  : translations[Translation.PageListUpdateSuccess]
              ),
              catchError(() =>
                isNew
                  ? of(translations[Translation.PageListCreatedError])
                  : of(translations[Translation.PageListUpdateError])
              ),
              finalize(() => [
                this.store.dispatch(new ActionCityStreamGet()),
                this.store.dispatch(new ActionAppLoadingHide())
              ])
            )
        )
      )
      .subscribe((message: string) => {
        this.store.dispatch(new ActionMobileToast(message));
        if (tagKey === TagListDefault.Published)
          this.store.dispatch(
            new Navigate(this.store.selectSnapshot(StateApp.homePath))
          );
        else this.navController.back();
      });
  }

  public select(object: Event): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
        switchMap(() =>
          this.store.dispatch([
            new ActionAppLoadingHide(),
            new Navigate([
              Pages.Tabs,
              Pages.Lists,
              Pages.EventDetail,
              object.id
            ])
          ])
        )
      )
      .subscribe();
  }

  public addEvent(): void {
    this.store.dispatch(
      new Navigate([Pages.Tabs, Pages.Lists, Pages.EventSelector])
    );
  }

  public selectImage(): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.camera.getPhoto()),
        filter((image: string | undefined) => image != null),
        map((image: string | undefined) => image as string),
        switchMap((image: string) =>
          this.store.dispatch(new ActionListPatchMetadata({ image }))
        ),
        finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
      )
      .subscribe();
  }
}
