import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateInterest, ActionInterestSave, StateUserEvents, ActionEventSetId, ActionEventInterestAdd, StateUser, ActionEventGet, ActionEventAccept, ActionEventSetIdAnonymousPending, ActionInterestEventsGetAnonymous, ActionEventDeny, ActionInterestDelete, Translation, ActionAppLoadingShow, ActionAppLoadingHide } from '@firefly/core';
import { Pages } from '@firefly/mobile';
import { Event, Interest } from '@firefly/cloud';
import { ActionMobileToast } from '@firefly/mobile';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { StorageImage, StateStorage } from '@theory/firebase';
import { BaseComponent, CoreEnum } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';
import { PageEventDetail } from '../event-detail';
import { TranslateService } from '@ngx-translate/core';

@Component
({
    selector    : 'app-page-interest-detail',
    templateUrl : 'interest-detail.page.html',
    styleUrls   : ['./interest-detail.page.scss']
})

export class PageInterestDetail extends BaseComponent implements OnInit
{
    @Select(StateInterest.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateInterest.data())      interest$:     Observable<Interest>;
    @Select(StateInterest.isNew())     isNew$:        Observable<boolean>;
    @Select(StateInterest.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateInterest.events)      events$:       Observable<Event[]>;
    @Select(StateInterest.pendingEvents) pendingEvents$: Observable<Event[]>;
    @Select(StateStorage.images)       images$:       Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)        device$:       Observable<boolean>;
    @Select(StateUserEvents.initialized()) stateUserInitialized$: Observable<boolean>;
    @Select(StateUser.userId)          userId$:       Observable<string>;
    @Select(StateInterest.canEdit)     canEdit$:      Observable<boolean>;
    @Select(StateUser.isPublisher)     isPublisher$:  Observable<boolean>;

    public Pages: any = Pages;
    public images: Record<string, StorageImage> = {};

    constructor
    (
        private store         : Store,
        private navController : NavController,
        private modal         : ModalController,
        private translate     : TranslateService,
        private alert         : AlertController
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

    public navigate(page: Pages.EventDetail)
    {
      const interest: Interest = this.store.selectSnapshot(StateInterest.data());

      this.store.dispatch([
        new ActionEventSetId(CoreEnum.IdNew),
        new ActionAppLoadingShow()
      ]).pipe(
        switchMap(() => this.store.dispatch(new ActionEventInterestAdd(interest))),
        switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
        switchMap(() => from(this.modal.create({
          component: PageEventDetail,
          componentProps: { modal: true }
        })))
      ).subscribe((modal: HTMLIonModalElement) => modal.present());
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
            switchMap(() => this.store.dispatch(new ActionEventGet(event.id))),
            switchMap(() => this.store.dispatch([
              new ActionAppLoadingHide(),
              new Navigate([Pages.NotificationDetail, event.id])
            ]))
        ).subscribe();
    }

    public addEvent(): void{
        this.store.dispatch(new Navigate([Pages.EventSelector]));
    }

    public edit(): void
    {
      const interest: Interest = this.store.selectSnapshot(StateInterest.data());
      this.store.dispatch([
        new Navigate([Pages.AssetInterest], {id: interest.id}, {state: {isInterestDetail:true}})
      ]).subscribe();
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
      this.store.dispatch(new ActionEventSetIdAnonymousPending(event.id)).pipe
      (
        switchMap(() => this.store.dispatch(new ActionEventAccept())),
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }

    public denyEvent(event: Event): void
    {
      this.store.dispatch(new ActionEventSetIdAnonymousPending(event.id)).pipe
      (
        switchMap(() => this.store.dispatch(new ActionEventDeny())),
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }
}
