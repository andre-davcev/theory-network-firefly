import { Component } from '@angular/core';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, Plugins, CameraPhoto } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, map, finalize } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { ActionClusterIconUriSet, ActionClusterDirty, ActionClusterIconPathSet, ActionUserIconsReset } from '@firefly/core';
import { Pages } from '../pages.enum';
import { ActionMobileLoadingShow, ActionMobileLoadingHide} from '@firefly/mobile';

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

    constructor(private store: Store, private modal: ModalController) { }

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
                    this.store.dispatch([
                      new ActionClusterIconUriSet(imageData),
                      new ActionClusterDirty()
                    ])
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
            this.store.dispatch(new ActionClusterIconPathSet()).
            subscribe();
        }
    }
}
