import { Component } from '@angular/core';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, CameraPhoto, Plugins } from '@capacitor/core';
import { Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { Pages, ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { switchMap, map, finalize } from 'rxjs/operators';
import { ActionUserImagesReset, ActionEventImageUriSet, ActionEventImagePathSet } from '@firefly/core';
import { from } from 'rxjs';

const { Camera } = Plugins;

@Component
({
    selector    : 'app-page-image-selector',
    templateUrl : 'image-selector.page.html',
    styleUrls   : ['./image-selector.page.scss']
})

export class PageImageSelector
{
    public Pages: any = Pages;
    public segment: Pages = Pages.ImageAssets;
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

    public cancel(): void
    {
        this.modal.dismiss();
    }

    public selectLibraryImage(index: number): void
    {
//        this.store.dispatch(new ActionEventSetImageIndex(index));

        this.modal.dismiss();
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
                switchMap(() => this.store.dispatch(new ActionUserImagesReset())),
                switchMap(() => from(Camera.getPhoto(options))),
                map((photo: CameraPhoto) => photo.dataUrl),
                switchMap((imageData: string) =>
                    this.store.dispatch([
                      new ActionEventImageUriSet(imageData)/*,
                      new ActionInterestDirty()*/
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
            this.store.dispatch(new ActionEventImagePathSet()).
            subscribe();
        }
    }
}
