import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { Select, Store } from '@ngxs/store';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { ActionIconSetId, ActionIconUriSet, ActionClusterPatch, StateIcon} from '@firefly/core'
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { Pages } from '../pages.enum';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-icon-selector',
    templateUrl : 'icon-selector.page.html',
    styleUrls   : ['./icon-selector.page.scss']
})

export class PageIconSelector
{
    public Pages: any = Pages;
    public segment: Pages = Pages.IconAssets;
    public translations: Array<string> = [];

    constructor(private store: Store, private modalController: ModalController) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public segmentChanged(event: any): void
    {
        this.segment = event.target.value;
    }

    public selectFromCamera()
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
              switchMap((iconUrl: string) => {
                  this.modalController.dismiss();
                  return this.store.dispatch(new ActionClusterPatch({ iconUrl }))
              })
          ).
          subscribe();
        }
    }
}
