import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { tap, switchMap, catchError, map} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { StatusBarStyle, CameraOptions, CameraResultType, CameraSource, CameraPhoto, Plugins } from '@capacitor/core';
import { Pages } from '../pages.enum';

import { ActionDeviceStatusBarSet, StateDevice } from '@theory/capacitor';
import { StateIcon, ActionIconUriSet, ActionIconSetId, MockIconId } from '@firefly/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

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
    @Select(StateIcon.url) url$: Observable<string>;

    public Pages: any = Pages;

    constructor(private store: Store)
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
                    )/*,
                    switchMap((iconUrl: string) =>
                        this.store.dispatch(new ActionClusterPatch({ iconUrl }))
                    )*/
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
