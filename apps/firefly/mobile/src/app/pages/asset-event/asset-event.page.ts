import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';

import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StatusBarStyle, Plugins, CameraOptions, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import { StateEvent, ActionEventImageUriSet, ActionEventPatch, ActionEventImagePathSet, ActionEventSave, StateImage, StateIcon, StateCluster } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from '@firefly/mobile';
import { Pages } from '@firefly/mobile';
import { PageEventLocation } from '../event-location';
import { PageAssetsClusters, ResolverPageAssetsClusters } from '../assets-clusters';
import { BaseComponent } from '@theory/core';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-event',
    templateUrl : 'asset-event.page.html',
    styleUrls   : ['./asset-event.page.scss']
})

export class PageAssetEvent
{
    @Select(StateEvent.formGroup())     form$:            Observable<FormGroup>;
    @Select(StateEvent.isNew())         isNew$:           Observable<boolean>;
    @Select(StateEvent.canUpdate())     canUpdate$:       Observable<boolean>;
    @Select(StateEvent.timeStart)       timeStart$:       Observable<string>;
    @Select(StateEvent.timeEnd)         timeEnd$:         Observable<string>;
    @Select(StateEvent.timeEndValid)    timeEndValid$:    Observable<boolean>;
    @Select(StateEvent.timeNotify)      timeNotify$:      Observable<boolean>;
    @Select(StateEvent.timeNotifyValid) timeNotifyValid$: Observable<boolean>;
    @Select(StateEvent.notifyComplete)  notifyComplete$:  Observable<boolean>;
    @Select(StateDevice.device)         device$:          Observable<boolean>;
    @Select(StateEvent.imageUrl)        imageUrl$:        Observable<string>;
    @Select(StateCluster.iconUrl)       iconUrl$:         Observable<string>;

    public Pages: any = Pages;

    constructor
    (
        private store:         Store,
        private modal:         ModalController,
        private resolver:      ResolverPageAssetsClusters,
        public  navController: NavController
    ) { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light }));
    }

    public navigate(page: Pages.AssetsClusters | Pages.ImageSelector | Pages.EventLocation)
    {
        if (page === Pages.AssetsClusters)
        {
            this.resolver.
            resolve(null, null).
            pipe
            (
                switchMap(() =>
                    from(this.modal.create
                    ({
                        component: PageAssetsClusters,
                        componentProps: { modal: true }
                    }))
                )
            ).
            subscribe((modal: HTMLIonModalElement) =>
                modal.present()
            );
        }
        else if (page === Pages.ImageSelector)
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
            }
        }
        else if (page === Pages.EventLocation)
        {
            from(this.modal.create({ component: PageEventLocation })).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
    }

    public timeChanged(event: CustomEvent, key: string): void
    {
        const time: string = event.detail.value;

        this.store.dispatch(new ActionEventPatch({ [key]: time }));
    }

    public save(): void
    {
        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionEventSave()
        ]).
        pipe
        (
            map(() => 'Event was successfully created!'),
            catchError(() => of('An error occurred creating the event!')),
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
