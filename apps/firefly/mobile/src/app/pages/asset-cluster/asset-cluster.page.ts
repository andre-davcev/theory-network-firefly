import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil, take } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateCluster, ActionClusterIconUriSet, ActionClusterIconPathSet, ActionClusterSave, StateUserEvents, ActionUserEventsGetData } from '@firefly/core';
import { PageIconSelector } from '../icon-selector';
import { Pages } from '@firefly/mobile';
import { Event } from '@firefly/cloud';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { NavController, ModalController } from '@ionic/angular';
import { StorageImage, StateStorage } from '@theory/firebase';
import { BaseComponent, CoreEnum } from '@theory/core';
import { Navigate } from '@ngxs/router-plugin';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster extends BaseComponent implements OnInit
{
    @Select(StateCluster.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateCluster.isNew())     isNew$:        Observable<boolean>;
    @Select(StateCluster.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateCluster.iconUrl)     iconUrl$:      Observable<string>;
    @Select(StateCluster.events)      events$:       Observable<Event[]>;
    @Select(StateStorage.images)      images$:       Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)       device$:       Observable<boolean>;
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

    public navigate(page: Pages.IconSelector)
    {
        from(this.modal.create({
          component: PageIconSelector
        })).
        subscribe((modal: HTMLIonModalElement) => modal.present());
    }

    public save(): void
    {
        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionClusterSave()
        ]).
        pipe
        (
            map(() => 'Cluster was successfully created!'),
            catchError(() => of('An error occurred creating the cluster!')),
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
        this.store.dispatch(new Navigate([Pages.AssetEvent, CoreEnum.IdNew]));
    }
}
