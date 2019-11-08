import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of, BehaviorSubject, combineLatest } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StatusBarStyle, Plugins, CameraOptions, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import { StateEvent, ActionEventCreate, ActionEventTimeSet, StateCluster, ServiceImages, ActionEventPatch, ActionImageSetId, ActionImageUriSet, StateImage } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from '@firefly/mobile';
import { Pages } from '../pages.enum';
import { PageEventLocation } from '../event-location';
import { PageAssetsClusters, ResolverPageAssetsClusters } from '../assets-clusters';
import { MockImageId } from '@firefly/app/mock';
import { BaseComponent } from '@theory/core';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-event',
    templateUrl : 'asset-event.page.html',
    styleUrls   : ['./asset-event.page.scss']
})

export class PageAssetEvent extends BaseComponent
{
    @Select(StateEvent.formGroup)    form$:         Observable<FormGroup>;
    @Select(StateEvent.isNew)        isNew$:        Observable<boolean>;
    @Select(StateEvent.canUpdate)    canUpdate$:    Observable<boolean>;
    @Select(StateEvent.timeStart)    timeStart$:    Observable<string>;
    @Select(StateEvent.timeEnd)      timeEnd$:      Observable<string>;
    @Select(StateEvent.timeEndValid) timeEndValid$: Observable<boolean>;
    @Select(StateCluster.icon)       icon$:         Observable<string>;
    @Select(StateEvent.image)        imageUrl$:     Observable<string>;
    @Select(StateDevice.device)      device$:       Observable<boolean>;

    private imageClicked$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public image$: Observable<string> = combineLatest
    ([
        this.device$,
        this.imageClicked$
    ]).
    pipe
    (
        switchMap(([device, imageClicked]) =>
            device ?
                this.image$ :
                !imageClicked ?
                    of(null) :
                    this.images.getDownloadUrl(MockImageId)
        )
    );

    public Pages: any = Pages;

    constructor
    (
        private store:    Store,
        private modal:    ModalController,
        private resolver: ResolverPageAssetsClusters,
        private images:   ServiceImages
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
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
                    quality: 100,
                    resultType: CameraResultType.Base64,
                    source: CameraSource.Photos
                };

                this.store.dispatch
                ([
                    new ActionMobileLoadingShow(),
                    new ActionImageSetId()
                ]).
                pipe
                (
                    switchMap(() => from(Camera.getPhoto(options))),
                    map((photo: CameraPhoto) => photo.base64String),
                    switchMap((imageData: string) =>
                        this.store.dispatch
                        ([
                            new ActionImageUriSet(imageData),
                            new ActionMobileLoadingHide()
                        ])
                    ),
                    map(() =>
                        this.store.selectSnapshot(StateImage.url)
                    ),
                    switchMap((imageUrl: string) =>
                        this.store.dispatch(new ActionEventPatch({ imageUrl }))
                    )
                ).
                subscribe();
            }
            else
            {
                this.imageClicked$.next(true);

                this.store.dispatch(new ActionEventPatch({ imageId: MockImageId }));
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

        this.store.dispatch(new ActionEventTimeSet(key, time));
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
