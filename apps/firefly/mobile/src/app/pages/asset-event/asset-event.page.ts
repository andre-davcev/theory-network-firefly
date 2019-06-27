import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Camera as CameraCordova, CameraOptions as CameraOptionsCordova } from '@ionic-native/camera/ngx';
import { map, catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet, StateDevice, Platform } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { ActionEventSetImage, StateEvent, ActionEventCreate, ActionEventSetTime } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from '@firefly/mobile';
import { Pages } from '../pages.enum';
import { PageEventLocation } from '../event-location';
import { PageAssetsClusters } from '../assets-clusters';
import { TempImageUri } from '@firefly/app/mock';

@Component
({
    selector    : 'app-page-asset-event',
    templateUrl : 'asset-event.page.html',
    styleUrls   : ['./asset-event.page.scss']
})

export class PageAssetEvent
{
    @Select(StateEvent.formGroup)               form$:         Observable<FormGroup>;
    @Select(StateEvent.eventImageUrlNormalized) imageUrl$:     Observable<string>;
    @Select(StateEvent.eventIsNew)              isNew$:        Observable<boolean>;
    @Select(StateEvent.eventCanUpdate)          canUpdate$:    Observable<boolean>;
    @Select(StateEvent.eventTimeStart)          timeStart$:    Observable<string>;
    @Select(StateEvent.eventTimeEnd)            timeEnd$:      Observable<string>;
    @Select(StateEvent.eventTimeEndValid)       timeEndValid$: Observable<boolean>;
    @Select(StateEvent.eventClusterIcon)        clusterIcon$:  Observable<string>;

    public Pages: any = Pages;

    constructor
    (
        private store: Store,
        private modal: ModalController,
        private camera: CameraCordova
    ) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(page: Pages.AssetsClusters | Pages.ImageSelector | Pages.EventLocation)
    {
        if (page === Pages.AssetsClusters)
        {
            from(this.modal.create
            ({
                component: PageAssetsClusters,
                componentProps: { modal: true }
            })).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
        else if (page === Pages.ImageSelector)
        {
            const platform: Platform = this.store.selectSnapshot(StateDevice.platform);

            if (platform === Platform.iOS || platform === Platform.Android)
            {
                const options: CameraOptionsCordova =
                {
                    quality: 100,
                    destinationType: this.camera.DestinationType.FILE_URI,
                    encodingType: this.camera.EncodingType.JPEG,
                    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
                };

                from(this.camera.getPicture(options)).
                subscribe((imageData: string) =>
                  this.store.dispatch(new ActionEventSetImage(imageData))
                );
            }
            else
            {
                this.store.dispatch(new ActionEventSetImage(TempImageUri));
            }
        }
        else if (page === Pages.EventLocation)
        {
            from(this.modal.create({ component: PageEventLocation })).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
    }

    public timeChanged(event: CustomEvent, key: 'start' | 'end'): void
    {
        const time: string = event.detail.value;

        this.store.dispatch(new ActionEventSetTime(key, time));
    }

    public save(): void
    {
        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionEventCreate()
        ]).
        pipe
        (
            map(() => 'Event was successfully created!'),
            catchError(() => of('An error occurred creating the event!'))
        ).
        subscribe((message: string) =>
            this.store.dispatch
            ([
                new ActionMobileLoadingHide(),
                new ActionMobileToast(message)
            ])
        );
    }
}
