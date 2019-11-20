import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { LoadingOptions } from '@ionic/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateCluster, ActionClusterCreate, StateIcon, ActionIconUriSet, ActionIconSetId, ActionClusterPatch, MockIconId } from '@firefly/core';
import { Pages } from '../pages.enum';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster
{
    @Select(StateCluster.formGroup) form$:   Observable<FormGroup>;
    @Select(StateCluster.icon)      icon$:   Observable<string>;
    @Select(StateDevice.device)     device$: Observable<boolean>;

    public Pages: any = Pages;
    private isDetail: boolean = false;

    constructor(
      private store: Store,
      private loading: LoadingController,
      private toast: ToastController
    )
    { }

    ionViewWillEnter()
    {
        /*this.form$.subscribe((x) => {
            x.valueChanges.subscribe((form) => {
                console.log('valid: ' + x.valid);
                console.log('form:  ' + JSON.stringify(form));
            });
        });*/

        this.isDetail = window.history.state.isClusterDetail;
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public navigate(page: Pages.IconSelector)
    {
        if (page === Pages.IconSelector)
        {
            if (this.store.selectSnapshot(StateDevice.device))
            {
                const options: CameraOptions =
                {
                    quality: 100,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Photos
                };

                this.store.dispatch(new ActionMobileLoadingShow()).
                pipe
                (
                    switchMap(() => from(Camera.getPhoto(options))),
                    map((photo: CameraPhoto) => photo.dataUrl),
                    switchMap((imageData: string) =>
                        this.store.dispatch(new ActionIconSetId()).pipe
                        (
                            switchMap(() => this.store.dispatch
                            ([
                                new ActionIconUriSet(imageData),
                                new ActionMobileLoadingHide()
                            ]))
                        )
                    ),
                    map(() =>
                        this.store.selectSnapshot(StateIcon.url)
                    ),
                    switchMap((iconUrl: string) =>
                        this.store.dispatch(new ActionClusterPatch({ iconUrl }))
                    )
                ).
                subscribe();
            }
            else
            {
                this.store.dispatch(new ActionIconSetId(MockIconId));
            }
        }
    }

    public imageClicked(): void
    {
        this.store.dispatch(new Navigate([Pages.ImageSelector]));
    }

    /*public setCluster(): void
    {
        this.store.dispatch(new ActionClusterSet());
    }*/

    public save(): void
    {
        const options: LoadingOptions =
        {
            spinner:     'crescent',
            translucent: false,
            cssClass:    'cpt-loading'
        };

        from(this.loading.create(options)).
        pipe
        (
            tap((loading: HTMLIonLoadingElement) => loading.present()),
            switchMap((loading: HTMLIonLoadingElement) =>
                this.store.dispatch(new ActionClusterCreate()).pipe(tap(() => loading.dismiss()))
            ),
            switchMap(() =>
                from(this.toast.create({ message: 'Event was successfully created!', duration: 2000 }))
            ),
            catchError((error: any) =>
                from(this.toast.create({ message: 'An error occurred creating the event!', duration: 2000 }))
            )
        ).
        subscribe((toast: HTMLIonToastElement) =>
            toast.present()
        );
    }

}
