import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateCluster, ActionClusterIconUriSet, ActionClusterIconPathSet, ActionClusterSave } from '@firefly/core';
import { Pages } from '../pages.enum';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster
{
    @Select(StateCluster.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateCluster.isNew())     isNew$:        Observable<boolean>;
    @Select(StateCluster.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateCluster.iconUrl)     iconUrl$:      Observable<string>;
    @Select(StateDevice.device)       device$:       Observable<boolean>;

    public Pages: any = Pages;

    constructor
    (
      private store: Store
    )
    { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({ style: StatusBarStyle.Light }));
    }

    public navigate(page: Pages.IconSelector)
    {
        if (page === Pages.IconSelector)
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
                    )
                ).
                subscribe();
            }
            else
            {
                this.store.dispatch(new ActionClusterIconPathSet()).
                subscribe();
            }
        }
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
