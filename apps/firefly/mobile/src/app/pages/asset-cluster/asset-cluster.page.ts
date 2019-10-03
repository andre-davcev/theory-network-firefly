import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { StatusBarStyle } from '@capacitor/core';
import { Camera as CameraCordova, CameraOptions as CameraOptionsCordova } from '@ionic-native/camera/ngx';
import { LoadingOptions } from '@ionic/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActionDeviceStatusBarSet, StateDevice, Platform } from '@theory/capacitor';
import { StateCluster, ActionClusterCreate, StateIcon, ActionIconUriSet } from '@firefly/core';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster
{
    @Select(StateCluster.formGroup) form$:        Observable<FormGroup>;
    @Select(StateIcon.url)          clusterIcon$: Observable<string>;

    public Pages: any = Pages;

    constructor(
      private store: Store,
      private camera: CameraCordova,
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

        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public navigate(page: Pages.IconSelector)
    {
        if (page === Pages.IconSelector)
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
                  this.store.dispatch(new ActionIconUriSet(imageData))
                );
            }
            else
            {
                this.store.dispatch(new ActionIconUriSet('assets/icons/temp-coffee-icon-pink.png'));
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
