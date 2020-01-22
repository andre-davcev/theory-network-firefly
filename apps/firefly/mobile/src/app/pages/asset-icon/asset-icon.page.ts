import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, finalize, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular'
import { StatusBarStyle, CameraPhoto, CameraSource, CameraResultType, CameraOptions, Plugins } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateIcon, ActionIconPatch, ActionUserIconsReset, ActionIconUriSet, ActionInterestIconPathSet, ActionIconSetId, MockIconId, ActionIconSave } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide, ActionMobileToast } from '@firefly/mobile';
import { Icon } from '@firefly/cloud';
import { Pages } from '@firefly/mobile';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'asset-icon.page.html',
    styleUrls   : ['./asset-icon.page.scss']
})

export class PageAssetIcon
{
    @Select(StateIcon.formGroup()) form$:         Observable<FormGroup>;
    @Select(StateIcon.isNew())     isNew$:        Observable<boolean>;
    @Select(StateIcon.canUpdate()) canUpdate$:    Observable<boolean>;
    @Select(StateIcon.iconUrl)     iconUrl$:      Observable<string>;

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
                  switchMap(() => this.store.dispatch(new ActionUserIconsReset())),
                  switchMap(() => from(Camera.getPhoto(options))),
                  map((photo: CameraPhoto) => photo.dataUrl),
                  switchMap((imageData: string) =>
                      this.store.dispatch(new ActionIconUriSet(imageData))
                  ),
                  finalize(() => {
                    this.store.dispatch(new ActionMobileLoadingHide())
                  })
              ).
              subscribe();
          }
          else
          {
              this.store.dispatch(new ActionInterestIconPathSet()).
              subscribe();
          }
      }
      else
      {
          this.store.dispatch(new ActionIconSetId(MockIconId));
      }
    }

    public save(): void
    {
        const dataUri: string = this.store.selectSnapshot(StateIcon.dataUri);

        this.store.dispatch
        ([
            new ActionMobileLoadingShow(),
            new ActionIconSetId()
        ]).
        pipe
        (
            switchMap(() => this.store.dispatch(new ActionIconUriSet(dataUri))),
            switchMap(() => this.store.dispatch(new ActionIconSave())),
            map(() => 'Icon was successfully created!'),
            catchError((uploadError: any) =>{alert('error: ' + uploadError); return of('An error occurred creating the icon!')}),
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
