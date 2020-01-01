import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize, takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateCluster, ActionClusterIconUriSet, ActionClusterIconPathSet, ActionClusterSave } from '@firefly/core';
import { PageIconSelector } from '../icon-selector';
import { Pages } from '@firefly/mobile';
import { Event } from '@firefly/cloud';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { NavController, ModalController } from '@ionic/angular';
import { StorageImage, StateStorage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';

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
    @Select(StateStorage.images)     images$:   Observable<Record<string, StorageImage>>;
    @Select(StateDevice.device)       device$:       Observable<boolean>;

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
        /*if (page === Pages.IconSelector)
        {
            if (this.store.selectSnapshot(StateDevice.device))
            {
                const options: CameraOptions =
                {
                    quality:    100,
                    resultType: CameraResultType.DataUrl,
                    source:     CameraSource.Photos
                };

                this.store.dispatch(new ActionMobileLoadingShow()).
                pipe
                (
                    switchMap(() => from(Camera.getPhoto(options))),
                    map((photo: CameraPhoto) => photo.dataUrl),
                    switchMap((imageData: string) =>
                        this.store.dispatch(new ActionClusterIconUriSet(imageData))
                    ),
                    finalize(() =>
                        this.store.dispatch(new ActionMobileLoadingHide())
                    )
                ).
                subscribe();
            }
            else
            {
                this.store.dispatch(new ActionClusterIconPathSet()).
                subscribe();
            }
        }*/
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

}
