import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { UntypedFormGroup } from '@angular/forms';
import { Style } from '@capacitor/status-bar';
import {
  AlertController,
  ModalController,
  NavController
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { Place } from '@firefly/cloud';
import { ActionMobileToast, Pages } from '@firefly/mobile';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionEventAccept,
  ActionEventDeny,
  ActionEventPatch,
  ActionEventPatchMetadata,
  ActionEventPlaceSet,
  ActionEventSave,
  ActionEventTimeSet,
  ActionInterestEventsGetAnonymous,
  ActionUserEventsDelete,
  Color,
  IconSlot,
  IconType,
  StateEvent,
  Translation
} from '@firefly/shared';
import {
  ActionDeviceStatusBarSet,
  ServiceCamera,
  StateDevice
} from '@theory/capacitor';
import { TimestampFormat } from '@theory/firebase';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
  PageAssetsInterests,
  ResolverPageAssetsInterests
} from '../assets-interests';
import { PageEventLocation } from '../event-location';

@Component({
  selector: 'app-page-event-detail',
  templateUrl: 'event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageEventDetail {
  @Select(StateEvent.formGroup()) form$!: Observable<UntypedFormGroup>;
  @Select(StateEvent.isNew()) isNew$!: Observable<boolean>;
  @Select(StateEvent.timeStart) timeStart$!: Observable<Timestamp>;
  @Select(StateEvent.timeStartValid) timeStartValid$!: Observable<boolean>;
  @Select(StateEvent.timeEnd) timeEnd$!: Observable<Timestamp>;
  @Select(StateEvent.timeEndValid) timeEndValid$!: Observable<boolean>;
  @Select(StateEvent.timeNotify) timeNotify$!: Observable<Timestamp>;
  @Select(StateEvent.timeNotifyValid) timeNotifyValid$!: Observable<boolean>;
  @Select(StateEvent.timeIsLocked) timeIsLocked$!: Observable<boolean>;
  @Select(StateEvent.private) private$!: Observable<boolean>;
  @Select(StateEvent.notifyComplete) notifyComplete$!: Observable<boolean>;
  @Select(StateDevice.device) device$!: Observable<boolean>;
  @Select(StateEvent.image) image$!: Observable<string>;
  @Select(StateEvent.icon) icon$!: Observable<string>;
  @Select(StateEvent.canAccept) canAccept$!: Observable<boolean>;
  @Select(StateEvent.place) place$!: Observable<Place>;
  @Select(StateEvent.canEditShow) canEditShow$!: Observable<boolean>;
  @Select(StateEvent.canEdit) canEdit$!: Observable<boolean>;
  @Select(StateEvent.canDeleteShow) canDeleteShow$!: Observable<boolean>;
  @Select(StateEvent.canDelete) canDelete$!: Observable<boolean>;

  @Input() modal: boolean = false;

  public Pages: any = Pages;
  public IconType: any = IconType;
  public IconSlot: any = IconSlot;
  public Color: any = Color;

  public TimestampFormat: any = TimestampFormat;

  public now: string = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  ).toISOString();

  constructor(
    private store: Store,
    private camera: ServiceCamera,
    private modalController: ModalController,
    private resolver: ResolverPageAssetsInterests,
    public navController: NavController,
    private translate: TranslateService,
    private alert: AlertController
  ) {}

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public navigate(
    page: Pages.AssetsInterests | Pages.ImageSelector | Pages.EventLocation
  ) {
    if (page === Pages.AssetsInterests) {
      this.resolver
        .resolve({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        .pipe(
          switchMap(() =>
            from(
              this.modalController.create({
                component: PageAssetsInterests,
                componentProps: { modal: true }
              })
            )
          )
        )
        .subscribe((modalController: HTMLIonModalElement) =>
          modalController.present()
        );
    } else if (page === Pages.ImageSelector) {
      /*
          from(this.modalController.create({
            component: PageImageSelector
          })).
          subscribe((modalController: HTMLIonModalElement) => modalController.present());
*/
      /* if (this.store.selectSnapshot(StateDevice.device))
            {
                const options: CameraOptions =
                {
                    quality:    100,
                    resultType: CameraResultType.DataUrl,
                    source:     CameraSource.Photos
                };

                this.store.dispatch(new ActionAppLoadingShow()).
                pipe
                (
                    switchMap(() => from(Camera.getPhoto(options))),
                    map((photo: CameraPhoto) => photo.dataUrl),
                    switchMap((imageData: string) =>
                        this.store.dispatch(new ActionEventImageUriSet(imageData))
                    ),
                    finalize(() =>
                        this.store.dispatch(new ActionMobileLoadingHide())
                    )
                ).
                subscribe();
            }
            else
            {
                this.store.dispatch(new ActionEventImagePathSet()).
                subscribe();
            }*/
    } else if (page === Pages.EventLocation) {
      const virtual: boolean = this.store.selectSnapshot(StateEvent.virtual);
      const place: Place = this.store.selectSnapshot(StateEvent.place);

      from(
        this.modalController.create({
          component: PageEventLocation,
          componentProps: { virtual, place }
        })
      ).subscribe((modalController: HTMLIonModalElement) =>
        modalController.present()
      );
    }
  }

  public delete(): void {
    const id: string = this.store.selectSnapshot(StateEvent.id());

    this.translate
      .get([
        Translation.AlertConfirmDeleteHeader,
        Translation.AlertConfirmDeleteMessage,
        Translation.AlertConfirmDeleteCancel,
        Translation.AlertConfirmDeleteConfirm,
        Translation.AlertConfirmDeleteEvent
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.alert.create({
            cssClass: 'cpt-alert',
            header: `${translations[Translation.AlertConfirmDeleteHeader]} ${
              translations[Translation.AlertConfirmDeleteEvent]
            }?`,
            message: translations[Translation.AlertConfirmDeleteMessage],

            buttons: [
              {
                text: translations[Translation.AlertConfirmDeleteCancel],
                role: 'cancel'
              },
              {
                text: translations[Translation.AlertConfirmDeleteConfirm],
                handler: () => this.deleteConfirm(id)
              }
            ]
          })
        ),
        switchMap((alert: HTMLIonAlertElement) => from(alert.present()))
      )
      .subscribe();
  }

  private deleteConfirm(id: string): void {
    this.store
      .dispatch(new ActionUserEventsDelete(id))
      .subscribe(() => this.navController.back());
  }

  public selectIcon(): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.camera.getPhoto()),
        switchMap((icon: string | undefined) =>
          this.store.dispatch(new ActionEventPatchMetadata({ icon }))
        ),
        finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
      )
      .subscribe();
  }

  public selectImage(): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.camera.getPhoto()),
        switchMap((image: string | undefined) =>
          this.store.dispatch(new ActionEventPatchMetadata({ image }))
        ),
        finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
      )
      .subscribe();
  }

  public timeChanged(event: Event, key: string): void {
    const value: string = (event as CustomEvent).detail.value;

    this.store.dispatch(new ActionEventTimeSet(key, value));
  }

  public virtualChanged(event: any): void {
    this.store
      .dispatch(new ActionEventPlaceSet())
      .pipe(
        switchMap(() =>
          this.store.dispatch(
            new ActionEventPatch({ virtual: event.detail.checked })
          )
        )
      )
      .subscribe();
  }

  public save(): void {
    const isNew: boolean = this.store.selectSnapshot(StateEvent.isNew());

    this.translate
      .get([
        Translation.PageEventCreatedSuccess,
        Translation.PageEventCreatedError,
        Translation.PageEventUpdateSuccess,
        Translation.PageEventUpdateError
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.store
            .dispatch([new ActionAppLoadingShow(), new ActionEventSave()])
            .pipe(
              switchMap(() =>
                this.store.dispatch(new ActionInterestEventsGetAnonymous())
              ),
              map(() =>
                isNew
                  ? translations[Translation.PageEventCreatedSuccess]
                  : translations[Translation.PageEventUpdateSuccess]
              ),
              catchError(() =>
                isNew
                  ? of(translations[Translation.PageEventCreatedError])
                  : of(translations[Translation.PageEventUpdateError])
              ),
              finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
            )
        )
      )
      .subscribe((message: string) => {
        this.store.dispatch(new ActionMobileToast(message));

        if (this.modal) {
          this.modalController.dismiss(
            this.store.selectSnapshot(StateEvent.data())
          );
        } else this.navController.back();
      });
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  public acceptEvent(): void {
    this.store
      .dispatch(new ActionEventAccept())
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionInterestEventsGetAnonymous())
        )
      )
      .subscribe();
  }

  public denyEvent(): void {
    this.store
      .dispatch(new ActionEventDeny())
      .pipe(
        switchMap(() =>
          this.store.dispatch(new ActionInterestEventsGetAnonymous())
        )
      )
      .subscribe();
  }
}
