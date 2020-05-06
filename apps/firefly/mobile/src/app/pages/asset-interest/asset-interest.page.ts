import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateInterest, ActionInterestIconUriSet, ActionInterestIconPathSet, ActionInterestSave, StateUserEvents, ActionUserEventsGetData } from '@firefly/core';
import { PageIconSelector } from '../icon-selector';
import { Pages } from '@firefly/mobile';
import { Event } from '@firefly/cloud';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { NavController, ModalController } from '@ionic/angular';
import { StorageImage, StateStorage } from '@theory/firebase';
import { BaseComponent, CoreEnum } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';
import { PageEventSelector } from '../event-selector';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-interest',
    templateUrl : 'asset-interest.page.html',
    styleUrls   : ['./asset-interest.page.scss']
})

export class PageAssetInterest extends BaseComponent implements OnInit
{
    @Select(StateInterest.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateInterest.isNew())     isNew$:        Observable<boolean>;
    @Select(StateInterest.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateInterest.iconUrl)     iconUrl$:      Observable<string>;
    @Select(StateInterest.events)      events$:       Observable<Event[]>;
    @Select(StateInterest.private)     private$:      Observable<boolean>;
    @Select(StateStorage.images)       images$:       Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)        device$:       Observable<boolean>;
    @Select(StateUserEvents.initialized()) stateUserInitialized$: Observable<boolean>;

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

    public add(page: Pages.IconSelector | Pages.EventSelector)
    {
        //this.store.dispatch(new Navigate([ Pages.AssetEvent, CoreEnum.IdNew ]));

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

    public select(object: Event): void
    {
        this.store.dispatch(new ActionMobileLoadingShow()).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
            switchMap(() => this.store.dispatch([
              new ActionMobileLoadingHide(),
              new Navigate([Pages.AssetEvent, object.id])
            ]))
        ).subscribe();
    }

    public addEvent(): void{
        this.store.dispatch(new Navigate([Pages.EventSelector]));
    }
}
