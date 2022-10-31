import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil, tap, filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { StatusBarStyle } from '@capacitor/core';
import { NavController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';

import { BaseComponent, CoreEnum } from '@theory/core';
import { StorageImage, StateStorage, TimestampFormat } from '@theory/firebase';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateInterest, ActionInterestSave, StateUserEvents, StateUser, ActionEventGet, ActionEventAccept, ActionEventSetIdAnonymousPending, ActionInterestEventsGetAnonymous, ActionEventDeny, ActionInterestDelete, Translation, ActionAppLoadingShow, ActionAppLoadingHide, ActionInterestEventsAdd, ActionEventSetId, ActionUserEventsGetData } from '@firefly/shared';
import { Pages, ActionMobileToast } from '@firefly/mobile';
import { Event, Interest } from '@firefly/cloud';

import { PageEventDetail } from '../event-detail';
import { PageEventSelector } from '../event-selector';

@Component
({
    selector    : 'app-page-interest-detail',
    templateUrl : 'interest-detail.page.html',
    styleUrls   : ['./interest-detail.page.scss']
})

export class PageInterestDetail extends BaseComponent implements OnInit
{
    @Select(StateInterest.formGroup()) form$:         Observable<UntypedFormGroup>;
    @Select(StateInterest.data())      interest$:     Observable<Interest>;
    @Select(StateInterest.isNew())     isNew$:        Observable<boolean>;
    @Select(StateInterest.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateInterest.events)      events$:       Observable<Event[]>;
    @Select(StateInterest.eventsPending) eventsPending$: Observable<Event[]>;
    @Select(StateStorage.images)       images$:       Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)        device$:       Observable<boolean>;
    @Select(StateUserEvents.initialized()) stateUserInitialized$: Observable<boolean>;
    @Select(StateUser.userId)          userId$:       Observable<string>;
    @Select(StateInterest.canEdit)     canEdit$:      Observable<boolean>;
    @Select(StateUser.isPublisher)     isPublisher$:  Observable<boolean>;

    public Pages: typeof Pages = Pages;
    public images: Record<string, StorageImage> = {};
    public TimestampFormat: any = TimestampFormat;

    constructor
    (
        private store         : Store,
        private navController : NavController,
        private modal         : ModalController,
        private translate     : TranslateService,
        private alert         : AlertController,
        private actionSheet   : ActionSheetController
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

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({ style: StatusBarStyle.Light }));
    }

    public add(): void
    {
        this.translate.
        get
        ([
            'action.go.interest.title',
            'action.go.interest.new',
            'action.go.interest.existing'
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                from(this.actionSheet.create
                  ({
                      header: translations['action.go.interest.title'],

                      buttons:
                      [
                          {
                              text : translations['action.go.interest.new'],
                              handler : () => this.addEvent(false)
                          },
                          {
                              text    : translations['action.go.interest.existing'],
                              handler : () => this.addEvent(true)
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        ).
        subscribe();
    }

    public addEvent(existing: boolean): void
    {

        this.store.dispatch(new ActionAppLoadingShow()).
        pipe
        (
            map(() =>
                !existing ?
                    this.store.dispatch(new ActionEventSetId(CoreEnum.IdNew)) :
                    this.store.selectSnapshot(StateUserEvents.initialized()) ?
                        of(null) :
                        this.store.dispatch(new ActionUserEventsGetData())
            ),
            switchMap(() =>
                from(this.modal.create
                ({
                    component: existing ? PageEventSelector : PageEventDetail,
                    componentProps: { modal: true }
                }))
            ),
            switchMap((modal: HTMLIonModalElement) =>
                from(modal.present()).
                pipe
                (
                    tap(() =>
                        this.store.dispatch(new ActionAppLoadingHide())
                    ),
                    switchMap(() =>
                        from(modal.onDidDismiss())
                    ),
                    map((select: any) =>
                        select.data
                    ),
                    filter((event: Event) =>
                        event != null
                    ),
                    switchMap((event: Event) =>
                        this.store.dispatch(new ActionInterestEventsAdd(event))
                    )
                )
            )
        ).
        subscribe();
    }

    public save(): void
    {
        const isNew : boolean = this.store.selectSnapshot(StateInterest.isNew());

        this.translate.get
        ([
            Translation.PageInterestCreatedSuccess,
            Translation.PageInterestCreatedError,
            Translation.PageInterestUpdateSuccess,
            Translation.PageInterestUpdateError
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                this.store.dispatch
                ([
                    new ActionAppLoadingShow(),
                    new ActionInterestSave()
                ]).
                pipe
                (
                    map(() =>
                        isNew ?
                            translations[Translation.PageInterestCreatedSuccess] :
                            translations[Translation.PageInterestUpdateSuccess]
                    ),
                    catchError(() =>
                        isNew ?
                            of(translations[Translation.PageInterestCreatedError]) :
                            of(translations[Translation.PageInterestUpdateError])
                    ),
                    finalize(() =>
                        this.store.dispatch(new ActionAppLoadingHide())
                    )
                )
            )
        ).
        subscribe((message: string) =>
        {
            this.store.dispatch(new ActionMobileToast(message));
            this.navController.back();
        });
    }

    public select(event: Event): void
    {
        this.store.dispatch(new ActionAppLoadingShow()).
        pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionEventGet(event.id))
            ),
            switchMap(() =>
                this.store.dispatch
                ([
                    new ActionAppLoadingHide(),
                    new Navigate([Pages.NotificationDetail, event.id], {isEvent: true})
                ])
            )
        ).
        subscribe();
    }

    public edit(): void
    {
        const interest: Interest = this.store.selectSnapshot(StateInterest.data());

        this.store.dispatch(new Navigate([Pages.AssetInterest], {id: interest.id}, {state: {isInterestDetail:true}}));
    }

    public delete(): void
    {
        this.translate.get
        ([
              Translation.AlertConfirmDeleteHeader,
              Translation.AlertConfirmDeleteMessage,
              Translation.AlertConfirmDeleteCancel,
              Translation.AlertConfirmDeleteConfirm,
              Translation.AlertConfirmDeleteInterest
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                this.alert.create
                ({
                    cssClass : 'cpt-alert',
                    header   : `${translations[Translation.AlertConfirmDeleteHeader]} ${translations[Translation.AlertConfirmDeleteInterest]}?`,
                    message  : translations[Translation.AlertConfirmDeleteMessage],

                    buttons:
                    [
                        {
                            text : translations[Translation.AlertConfirmDeleteCancel],
                            role : 'cancel'
                        },
                        {
                            text    : translations[Translation.AlertConfirmDeleteConfirm],
                            handler : () =>
                                this.store.dispatch(new ActionInterestDelete()).pipe
                                (
                                    switchMap(() =>
                                        this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]))
                                    )
                                ).
                                subscribe()
                        }
                    ]
                })
            ),
            switchMap((alert: HTMLIonAlertElement) =>
                from(alert.present())
            )
        ).
        subscribe();
    }

    public acceptEvent(event: Event): void
    {
        const interest: Interest = this.store.selectSnapshot(StateInterest.data());

        this.store.dispatch(new ActionEventSetIdAnonymousPending(event.id)).pipe
        (
            switchMap(() => this.store.dispatch(new ActionEventAccept(interest))),
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
        ).
        subscribe();
    }

    public denyEvent(event: Event): void
    {
        this.store.dispatch(new ActionEventSetIdAnonymousPending(event.id)).pipe
        (
          switchMap(() => this.store.dispatch(new ActionEventDeny())),
          switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
        ).
        subscribe();
    }
}
