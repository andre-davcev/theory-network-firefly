import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { StatusBarStyle } from '@capacitor/core';
import { Camera as CameraCordova, CameraOptions as CameraOptionsCordova } from '@ionic-native/camera/ngx';

import { BaseComponent } from '@theory/core';
import { ActionDeviceStatusBarSet, StateDevice, Platform } from '@theory/capacitor';
import { StateCluster, ActionSetClusterId, ActionClusterSetIcon, ActionSetCluster, AssetKey, ClusterKey } from '@firefly/core';
import { ItemDescription } from '@firefly/mobile';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster extends BaseComponent
{
    @Select(StateCluster.form)          form$:        Observable<FormGroup>;
    @Select(StateCluster.clusterIconNormalized)   clusterIcon$: Observable<string>;

    public Pages:      any = Pages;
    public AssetKey:   any = AssetKey;
    public ClusterKey: any = ClusterKey;

    public itemDescription: ItemDescription =
    {
        description: 'description'
    };

    constructor(private store: Store,
      private translate: TranslateService,
      private camera: CameraCordova)
    {
        super();

        this.store.dispatch(new ActionSetClusterId('new'));

        this.translate.get
        ([
            'page.cluster.descriptionPlaceholder',
            'general.description'
        ]).
        pipe(takeUntil(this.destroy$)).
        subscribe((translations: Array<string>) =>
        {
            this.itemDescription =
            {
                ...this.itemDescription,
                title:                  translations['general.description'],
                descriptionPlaceholder: translations['page.cluster.descriptionPlaceholder']
            };
        });
    }

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
                  this.store.dispatch(new ActionClusterSetIcon(imageData))
                );
            }
            else
            {
                this.store.dispatch(new ActionClusterSetIcon('assets/icons/temp-coffee-icon-pink.png'));
            }
        }
    }

    public imageClicked(): void
    {
        this.store.dispatch(new Navigate([Pages.ImageSelector]));
    }

    public setCluster(): void
    {
        this.store.dispatch(new ActionSetCluster());
    }
}
