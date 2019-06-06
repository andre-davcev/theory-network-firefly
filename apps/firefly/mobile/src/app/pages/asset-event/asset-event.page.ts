import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Camera as CameraCordova, CameraOptions as CameraOptionsCordova } from '@ionic-native/camera/ngx';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ActionDeviceStatusBarSet, StateDevice, Platform } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { EventKey, ActionEventSetImage, StateEvent, AssetKey, ActionEventCreate, ActionEventSetTime } from '@firefly/core';
import { BaseComponent } from '@theory/core';
import { ItemDescription, ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from '@firefly/mobile';
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

export class PageAssetEvent extends BaseComponent implements OnInit
{
    @Select(StateEvent.formGroup)               form$:         Observable<FormGroup>;
    @Select(StateEvent.eventImageUrlNormalized) imageUrl$:     Observable<string>;
    @Select(StateEvent.eventIsNew)              isNew$:        Observable<boolean>;
    @Select(StateEvent.eventCanUpdate)          canUpdate$:    Observable<boolean>;
    @Select(StateEvent.eventTimeStart)          timeStart$:    Observable<string>;
    @Select(StateEvent.eventTimeEnd)            timeEnd$:      Observable<string>;
    @Select(StateEvent.eventTimeEndValid)       timeEndValid$: Observable<boolean>;
    @Select(StateEvent.eventClusterIcon)        clusterIcon$:  Observable<string>;

    public Pages:    any = Pages;
    public AssetKey: any = AssetKey;
    public EventKey: any = EventKey;

    public itemDescription: ItemDescription =
    {
        description: 'description'
    };

    constructor
    (
        private store: Store,
        private translate: TranslateService,
        private modal: ModalController,
        private camera: CameraCordova
    )
    {
        super();
    }

    public ngOnInit(): void
    {
        this.translate.get
        ([
            'page.event.descriptionPlaceholder',
            'general.description'
        ]).
        pipe(takeUntil(this.destroy$)).
        subscribe((translations: Array<string>) =>
        {
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

    public timeChanged(event: CustomEvent, key: EventKey.TimeStart | EventKey.TimeEnd): void
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
