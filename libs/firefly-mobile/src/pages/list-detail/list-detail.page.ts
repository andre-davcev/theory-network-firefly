import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Style } from '@capacitor/status-bar';
import {
  ActionSheetController,
  AlertController,
  IonInfiniteScroll,
  ModalController,
  NavController
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { Event, List } from '@firefly/cloud';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionEventAccept,
  ActionEventDeny,
  ActionEventGet,
  ActionEventSetId,
  ActionEventSetIdAnonymousPending,
  ActionListDelete,
  ActionListEventsAdd,
  ActionListEventsGetAnonymous,
  ActionListSave,
  ActionUserEventsGetData,
  Pages,
  StateApp,
  StateList,
  StateUser,
  StateUserEvents,
  Translation
} from '@firefly/shared';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { BaseComponent, CoreEnum } from '@theory/core';
import { StateStorage, StorageImage, TimestampFormat } from '@theory/firebase';

import { PageSize } from '@theory/ngxs';
import { ActionMobileToast } from '../../state';
import { PageEventDetail } from '../event-detail';
import { PageEventSelector } from '../event-selector';

@Component({
  selector: 'app-page-list-detail',
  templateUrl: 'list-detail.page.html',
  styleUrls: ['./list-detail.page.scss']
})
export class PageListDetail extends BaseComponent implements OnInit {
  @Select(StateList.formGroup()) form$!: Observable<UntypedFormGroup>;
  @Select(StateList.data()) list$!: Observable<List>;
  @Select(StateList.isNew()) isNew$!: Observable<boolean>;
  @Select(StateList.canUpdate()) canUpdate$!: Observable<boolean>;
  @Select(StateList.events) events$!: Observable<Event[]>;
  @Select(StateList.eventsPending) eventsPending$!: Observable<Event[]>;
  @Select(StateStorage.images) images$!: Observable<
    Record<string, StorageImage>
  >;
  @Select(StateDevice.device) device$!: Observable<boolean>;
  @Select(StateUserEvents.initialized())
  stateUserInitialized$!: Observable<boolean>;
  @Select(StateUser.userId) userId$!: Observable<string>;
  @Select(StateList.isOwner) canEdit$!: Observable<boolean>;
  @Select(StateUser.isPublisher) isPublisher$!: Observable<boolean>;

  @ViewChild(IonInfiniteScroll)
  public infiniteScroll!: IonInfiniteScroll;

  public Pages: typeof Pages = Pages;
  public images: Record<string, StorageImage> = {};
  public TimestampFormat: any = TimestampFormat;

  public events: Array<Event> = [];
  public eventsPaged: Array<Event> = [];

  constructor(
    private store: Store,
    private navController: NavController,
    private modal: ModalController,
    private translate: TranslateService,
    private alert: AlertController,
    private actionSheet: ActionSheetController
  ) {
    super();
  }

  public ngOnInit(): void {
    this.images$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (images: Record<string, StorageImage>) => (this.images = images)
      );

    this.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((events: Array<Event>) => {
        this.events = events;
        this.eventsPaged = [];

        this.eventsPage();
      });
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public add(): void {
    this.translate
      .get([
        'action.go.list.title',
        'action.go.list.new',
        'action.go.list.existing'
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          from(
            this.actionSheet.create({
              header: translations['action.go.list.title'],

              buttons: [
                {
                  text: translations['action.go.list.new'],
                  handler: () => this.addEvent(false)
                },
                {
                  text: translations['action.go.list.existing'],
                  handler: () => this.addEvent(true)
                }
              ]
            })
          )
        ),
        switchMap((actionSheet: HTMLIonActionSheetElement) =>
          actionSheet.present()
        )
      )
      .subscribe();
  }

  public addEvent(existing: boolean): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        map(() =>
          !existing
            ? this.store.dispatch(new ActionEventSetId(CoreEnum.IdNew))
            : this.store.selectSnapshot(StateUserEvents.initialized())
            ? of(null)
            : this.store.dispatch(new ActionUserEventsGetData())
        ),
        switchMap(() =>
          from(
            this.modal.create({
              component: existing ? PageEventSelector : PageEventDetail,
              componentProps: { modal: true }
            })
          )
        ),
        switchMap((modal: HTMLIonModalElement) =>
          from(modal.present()).pipe(
            tap(() => this.store.dispatch(new ActionAppLoadingHide())),
            switchMap(() => from(modal.onDidDismiss())),
            map((select: any) => select.data),
            filter((event: Event) => event != null),
            switchMap((event: Event) =>
              this.store.dispatch(new ActionListEventsAdd(event))
            )
          )
        )
      )
      .subscribe();
  }

  public save(): void {
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
              finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
            )
        )
      )
      .subscribe((message: string) => {
        this.store.dispatch(new ActionMobileToast(message));
        this.navController.back();
      });
  }

  public select(event: Event): void {
    const pageDetail: Pages = this.store.selectSnapshot(StateList.isOwner)
      ? Pages.EventDetail
      : Pages.NotificationDetail;

    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.store.dispatch(new ActionEventGet(event.id))),
        switchMap(() =>
          this.store.dispatch([
            new ActionAppLoadingHide(),
            new Navigate([Pages.Tabs, Pages.Lists, pageDetail, event.id], {
              isEvent: true
            })
          ])
        )
      )
      .subscribe();
  }

  public edit(): void {
    const list: List = this.store.selectSnapshot(StateList.data());

    this.store.dispatch(
      new Navigate(
        [Pages.Tabs, Pages.Lists, Pages.AssetList],
        { id: list.id },
        { state: { isListDetail: true } }
      )
    );
  }

  public delete(): void {
    this.translate
      .get([
        Translation.AlertConfirmDeleteHeader,
        Translation.AlertConfirmDeleteMessage,
        Translation.AlertConfirmDeleteCancel,
        Translation.AlertConfirmDeleteConfirm,
        Translation.AlertConfirmDeleteList
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.alert.create({
            cssClass: 'cpt-alert',
            header: `${translations[Translation.AlertConfirmDeleteHeader]} ${
              translations[Translation.AlertConfirmDeleteList]
            }?`,
            message: translations[Translation.AlertConfirmDeleteMessage],

            buttons: [
              {
                text: translations[Translation.AlertConfirmDeleteCancel],
                role: 'cancel'
              },
              {
                text: translations[Translation.AlertConfirmDeleteConfirm],
                handler: () =>
                  this.store
                    .dispatch(new ActionListDelete())
                    .pipe(
                      switchMap(() =>
                        this.store.dispatch(
                          new Navigate(
                            this.store.selectSnapshot(StateApp.homePath)
                          )
                        )
                      )
                    )
                    .subscribe()
              }
            ]
          })
        ),
        switchMap((alert: HTMLIonAlertElement) => from(alert.present()))
      )
      .subscribe();
  }

  public acceptEvent(event: Event): void {
    const list: List = this.store.selectSnapshot(StateList.data());

    this.store
      .dispatch(new ActionEventSetIdAnonymousPending(event.id))
      .pipe(
        switchMap(() => this.store.dispatch(new ActionEventAccept(list))),
        switchMap(() => this.store.dispatch(new ActionListEventsGetAnonymous()))
      )
      .subscribe();
  }

  public denyEvent(event: Event): void {
    this.store
      .dispatch(new ActionEventSetIdAnonymousPending(event.id))
      .pipe(
        switchMap(() => this.store.dispatch(new ActionEventDeny())),
        switchMap(() => this.store.dispatch(new ActionListEventsGetAnonymous()))
      )
      .subscribe();
  }

  private eventsPage(): void {
    const start: number = this.eventsPaged.length;
    const end: number = start + PageSize.Default - 1;
    const slice: Array<Event> = this.events.slice(start, end);

    this.eventsPaged = [...this.eventsPaged, ...slice];
  }

  public loadData(): void {
    if (this.events.length !== this.eventsPaged.length) {
      this.eventsPage();
    }

    this.infiniteScroll.complete();
  }
}
