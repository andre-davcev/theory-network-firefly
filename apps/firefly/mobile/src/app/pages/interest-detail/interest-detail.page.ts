import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil, take, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateInterest, ActionInterestIconUriSet, ActionInterestIconPathSet, ActionInterestSave, StateUserEvents, ActionUserEventsGetData, ActionEventSetId, ActionEventInterestAdd, StateUser, ActionEventGet, ActionEventAccept, ActionEventSetIdAnonymous, ActionInterestEventsGetAnonymous, ActionEventDeny } from '@firefly/core';
import { PageIconSelector } from '../icon-selector';
import { Pages } from '@firefly/mobile';
import { Event, Interest } from '@firefly/cloud';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { NavController, ModalController } from '@ionic/angular';
import { StorageImage, StateStorage } from '@theory/firebase';
import { BaseComponent, CoreEnum, CoreUtil } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';
import { PageEventSelector } from '../event-selector';
import { PageAssetEvent } from '..';
import { PageAssetInterest } from '../asset-interest';

const { Camera } = Plugins;

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
      private store:         Store,
      private navController: NavController,
      private modal:         ModalController,
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

    public navigate(page: Pages.AssetEvent)
    {
      const interest: Interest = this.store.selectSnapshot(StateInterest.data());

      this.store.dispatch([
        new ActionEventSetId(CoreEnum.IdNew),
        new ActionMobileLoadingShow()
      ]).pipe(
        switchMap(() => this.store.dispatch(new ActionEventInterestAdd(interest))),
        switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
        switchMap(() => from(this.modal.create({
          component: PageAssetEvent,
          componentProps: { modal: true }
        })))
      ).subscribe((modal: HTMLIonModalElement) => modal.present());
    }

    public save(): void
    {
        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionInterestSave()
        ]).
        pipe
        (
            map(() => 'Interest was successfully created!'),
            catchError(() => of('An error occurred creating the interest!')),
            finalize(() =>
                this.store.dispatch(new ActionMobileLoadingHide())
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
        this.store.dispatch(new ActionMobileLoadingShow()).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionEventGet(event.id))),
            switchMap(() => this.store.dispatch([
              new ActionMobileLoadingHide(),
              new Navigate([Pages.EventDetail, event.id])
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

    public acceptEvent(event: Event): void
    {
      this.store.dispatch(new ActionEventSetIdAnonymous(event.id)).pipe
      (
        switchMap(() => this.store.dispatch(new ActionEventAccept())),
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }

    public denyEvent(event: Event): void
    {
      this.store.dispatch(new ActionEventSetIdAnonymous(event.id)).pipe
      (
        switchMap(() => this.store.dispatch(new ActionEventDeny())),
        switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous()))
      ).subscribe();
    }
}
