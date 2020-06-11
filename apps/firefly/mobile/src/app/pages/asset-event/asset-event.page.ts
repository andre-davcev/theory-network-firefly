import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';

import { ActionDeviceStatusBarSet, StateDevice, ServiceCamera } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { StateEvent, ActionEventPatch, ActionEventSave, IconType, Color, IconSlot, ActionInterestEventsGetAnonymous, ActionEventPatchMetadata } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from '@firefly/mobile';
import { Pages } from '@firefly/mobile';
import { PageEventLocation } from '../event-location';
import { PageAssetsInterests, ResolverPageAssetsInterests } from '../assets-interests';

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
    @Select(StateEvent.canEdit)         canEdit$:         Observable<boolean>;
    @Select(StateEvent.canUpdate())     canUpdate$:       Observable<boolean>;
    @Select(StateEvent.timeStart)       timeStart$:       Observable<string>;
    @Select(StateEvent.timeEnd)         timeEnd$:         Observable<string>;
    @Select(StateEvent.timeEndValid)    timeEndValid$:    Observable<boolean>;
    @Select(StateEvent.timeNotify)      timeNotify$:      Observable<string>;
    @Select(StateEvent.timeNotifyValid) timeNotifyValid$: Observable<boolean>;
    @Select(StateEvent.private)         private$:         Observable<boolean>;
    @Select(StateEvent.notifyComplete)  notifyComplete$:  Observable<boolean>;
    @Select(StateDevice.device)         device$:          Observable<boolean>;
    @Select(StateEvent.image)           image$:           Observable<string>;
    @Select(StateEvent.icon)            icon$:            Observable<string>;

    @Input() modal: boolean = false;

    public Pages    : any = Pages;
    public IconType : any = IconType;
    public IconSlot : any = IconSlot;
    public Color    : any = Color;

    constructor
    (
        private store:           Store,
        private camera:          ServiceCamera,
        private modalController: ModalController,
        private resolver:        ResolverPageAssetsInterests,
        public  navController:   NavController
    ) { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light }));
    }

    public navigate(page: Pages.AssetsInterests | Pages.ImageSelector | Pages.EventLocation)
    {
        if (page === Pages.AssetsInterests)
        {
            this.resolver.
            resolve(null, null).
            pipe
            (
                switchMap(() =>
                    from(this.modalController.create
                    ({
                        component: PageAssetsInterests,
                        componentProps: { modal: true }
                    }))
                )
            ).
            subscribe((modalController: HTMLIonModalElement) =>
                modalController.present()
            );
        }
        else if (page === Pages.ImageSelector)
        {
/*
          from(this.modalController.create({
            component: PageImageSelector
          })).
          subscribe((modalController: HTMLIonModalElement) => modalController.present());
*/
           /* if (this.store.selectSnapshot(StateDevice.device))
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
            }*/
        }
        else if (page === Pages.EventLocation)
        {
            const virtual: boolean = this.store.selectSnapshot(StateEvent.data()).virtual;
            from(this.modalController.create({ component: PageEventLocation,
                                               componentProps: { virtual }})).
            subscribe((modalController: HTMLIonModalElement) => modalController.present());
        }
    }

    public selectIcon(): void
    {
        this.store.dispatch(new ActionMobileLoadingShow()).
        pipe
        (
            switchMap(() =>
                this.camera.getPhoto()
            ),
            switchMap((icon: string) =>
                this.store.dispatch(new ActionEventPatchMetadata({ icon }))
            ),
            finalize(() =>
                this.store.dispatch(new ActionMobileLoadingHide())
            )
        ).
        subscribe();
    }

    public selectImage(): void
    {
        this.store.dispatch(new ActionMobileLoadingShow()).
        pipe
        (
            switchMap(() =>
                this.camera.getPhoto()
            ),
            switchMap((image: string) =>
                this.store.dispatch(new ActionEventPatchMetadata({ image }))
            ),
            finalize(() =>
                this.store.dispatch(new ActionMobileLoadingHide())
            )
        ).
        subscribe();
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
            switchMap(() => this.store.dispatch(new ActionInterestEventsGetAnonymous())),
            map(() => 'Event was successfully created!'),
            catchError(() => of('An error occurred creating the event!')),
            finalize(() =>
                this.store.dispatch(new ActionMobileLoadingHide())
            )
        ).
        subscribe((message: string) =>
        {
            this.store.dispatch(new ActionMobileToast(message));

            if(this.modal)
            {
              this.modalController.dismiss();
            }
            else
              this.navController.back();
        });
    }

    public cancel(): void
    {
        this.modalController.dismiss();
    }
}
