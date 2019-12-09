import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap, map, finalize } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular'
import { StatusBarStyle, CameraPhoto, CameraSource, CameraResultType, CameraOptions, Plugins } from '@capacitor/core';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateIcon, ActionUserIconsReset, ActionClusterIconUriSet, ActionIconSetId, MockIconId } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { Pages } from '../pages.enum';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'asset-icon.page.html',
    styleUrls   : ['./asset-icon.page.scss']
})

export class PageAssetIcon
{
    @Select(StateIcon.formGroup) form$: Observable<FormGroup>;

    constructor(private store: Store, private modal: ModalController)
    {

    }

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
                      this.store.dispatch(new ActionClusterIconUriSet(imageData))
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
              this.store.dispatch(new ActionIconSetId(MockIconId));
          }
        }
    }
}
