import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, finalize, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular'
import { StatusBarStyle, CameraPhoto, CameraSource, CameraResultType, CameraOptions, Plugins } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateImage, ActionImagePatch, ActionUserImagesReset, ActionImageUriSet, ActionEventImagePathSet, ActionImageSetId, MockImageId, ActionImageSave } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { Image } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-assets-image',
    templateUrl : 'asset-image.page.html',
    styleUrls   : ['./asset-image.page.scss']
})

export class PageAssetImage
{
    @Select(StateImage.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateImage.isNew())     isNew$:        Observable<boolean>;
    @Select(StateImage.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateImage.iconUrl)     imageUrl$:      Observable<string>;

    public Pages: any = Pages;

    constructor
    (
      private store: Store,
      private modal: ModalController,
      private navController: NavController
    )
    {}

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public navigate(page: Pages.ImageSelector)
    {
        if (page === Pages.ImageSelector)
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
                  switchMap(() => this.store.dispatch(new ActionUserImagesReset())),
                  switchMap(() => from(Camera.getPhoto(options))),
                  map((photo: CameraPhoto) => photo.dataUrl),
                  switchMap((imageData: string) =>
                      this.store.dispatch(new ActionImageUriSet(imageData))
                  ),
                  finalize(() => {
                    this.modal.dismiss();
                    this.store.dispatch(new ActionMobileLoadingHide())
                  })
              ).
              subscribe();
          }
          else
          {
              this.modal.dismiss();
              this.store.dispatch(new ActionEventImagePathSet()).
              subscribe();
          }
      }
      else
      {
          this.store.dispatch(new ActionImageSetId(MockImageId));
      }
    }

    public save(): void
    {
        const dataUri: string = this.store.selectSnapshot(StateImage.dataUri);

        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionImageSetId()
        ]).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionImageUriSet(dataUri))),
            switchMap(() => this.store.dispatch(new ActionImageSave())),
            map(() => 'Image was successfully created!'),
            catchError((uploadError: any) =>{alert('error: ' + uploadError); return of('An error occurred creating the image!')}),
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
