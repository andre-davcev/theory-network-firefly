import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Camera as CameraCordova, CameraOptions as CameraOptionsCordova } from '@ionic-native/camera/ngx';
import { takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ActionDeviceStatusBarSet, StateDevice, Platform } from '@theory/capacitor';
import { StatusBarStyle, Camera, CameraOptions, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import { ActionEventSetId, EventKey, ActionEventPatch, ActionEventSetImage, StateEvent } from '@firefly/core';
import { BaseComponent } from '@theory/core';
import { ItemHeader, ItemDescription } from '@firefly/mobile';
import { Pages } from '../pages.enum';
import { PageEventLocation } from '../event-location';
import { PageAssetsClusters } from '../assets-clusters';

@Component
({
    selector    : 'app-page-asset-event',
    templateUrl : 'asset-event.page.html',
    styleUrls   : ['./asset-event.page.scss']
})

export class PageAssetEvent extends BaseComponent
{
    @Select(StateEvent.form)                    form$:         Observable<FormGroup>;
    @Select(StateEvent.eventImageUrlNormalized) imageUrl$:     Observable<string>;
    @Select(StateEvent.eventIsNew)              isNew$:        Observable<boolean>;
    @Select(StateEvent.eventCanUpdate)          canUpdate$:    Observable<boolean>;
    @Select(StateEvent.eventTimeStart)          timeStart$:    Observable<string>;
    @Select(StateEvent.eventTimeEnd)            timeEnd$:      Observable<string>;
    @Select(StateEvent.eventTimeEndValid)       timeEndValid$: Observable<boolean>;

    public Pages: any = Pages;
    public EventKey: any = EventKey;

    public itemHeader: ItemHeader =
    {
        title:        'name',
        subtitle:     'tagline',
        iconUrlEmpty: 'assets/icons/avatar-empty.svg',
        iconAsUrl:    true
    };

    public itemDescription: ItemDescription =
    {
        description: 'description'
    };

    constructor
    (
        private store: Store,
        private translate: TranslateService,
        private modalController: ModalController,
        private camera: CameraCordova
    )
    {
        super();

        this.store.dispatch(new ActionEventSetId('new'));

        this.translate.get
        ([
            'page.event.titlePlaceholder',
            'page.event.subtitlePlaceholder',
            'page.event.iconPlaceholder',
            'page.event.descriptionPlaceholder',
            'page.event.imagePlaceholder',
            'general.description'
        ]).
        pipe(takeUntil(this.destroy$)).
        subscribe((translations: Array<string>) =>
        {
            this.itemHeader =
            {
                ...this.itemHeader,
                titlePlaceholder:    translations['page.event.titlePlaceholder'],
                subtitlePlaceholder: translations['page.event.subtitlePlaceholder'],
                iconPlaceholder:     translations['page.event.iconPlaceholder']
            };

            this.itemDescription =
            {
                ...this.itemDescription,
                title:                  translations['general.description'],
                descriptionPlaceholder: translations['page.event.descriptionPlaceholder']
            };
        });
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(page: Pages.AssetsClusters | Pages.ImageSelector | Pages.EventLocation)
    {
        if (page === Pages.AssetsClusters)
        {
//            this.store.dispatch(new Navigate([page]));

            from(this.modalController.create
            ({
                component: PageAssetsClusters,
                componentProps: { modal: true }
            })).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
        else if (page === Pages.ImageSelector)
        {
            const platform: Platform = this.store.selectSnapshot(StateDevice.platform);

            if (platform === Platform.iOS)
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
            else if (platform === Platform.Android)
            {
                const options: CameraOptions =
                {
                    quality:           100,
                    allowEditing:      true,
                    resultType:        CameraResultType.Uri,
                    source:            CameraSource.Photos,
                    presentationStyle: 'fullscreen'
                };

                from(Camera.getPhoto(options)).
                subscribe((photo: CameraPhoto) =>
                  this.store.dispatch(new ActionEventSetImage(photo.base64Data))
                );
            }
            else
            {
                this.store.dispatch(new ActionEventSetImage('assets/icons/temp-coffee-icon-pink.png'));
            }
        }
        else if (page === Pages.EventLocation)
        {
            from(this.modalController.create({ component: PageEventLocation })).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
    }

    public timeChanged(event: CustomEvent, key: EventKey.TimeStart | EventKey.TimeEnd): void
    {
        const time: string = event.detail.value;

        this.store.dispatch(new ActionEventPatch(key, time));
    }

    public save(): void
    {

    }
}
