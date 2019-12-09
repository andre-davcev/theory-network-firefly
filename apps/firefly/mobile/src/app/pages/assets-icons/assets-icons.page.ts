import { Component, OnInit } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';
import { Navigate } from '@ngxs/router-plugin';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateStorage, StorageImage } from '@theory/firebase'
import { BaseComponent } from '@theory/core';
import { Store, Select } from '@ngxs/store';
import { StateUserIcons, Icon} from '@firefly/core';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-assets-icons',
    templateUrl : 'assets-icons.page.html',
    styleUrls   : ['./assets-icons.page.scss']
})

export class PageAssetsIcons extends BaseComponent implements OnInit
{
    /*public icons: Array<string> =
    [
        'assets/icons/temp-coffee-icon-blue.png',
        'assets/icons/temp-coffee-icon-pink.png',
        'assets/icons/temp-coffee-icon-brown.png'
    ];*/

    @Select(StateUserIcons.data())    userIcons$:  Observable<Array<Icon>>;
    @Select(StateStorage.images)    images$: Observable<Record<string, StorageImage>>;

    public images: Record<string, StorageImage> = {};
    public userIcons: Array<Icon>;
    public urls$: Observable<Array<string>>;
    public urls: Array<string>  = [];

    constructor(private store: Store)
    {
      super();
    }

    public ngOnInit(): void
    {
        this.images$.
        pipe(takeUntil(this.destroy$)).
        subscribe((images: Record<string, StorageImage>) =>
            this.images = images
        );
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    navigate(): void{
      this.store.dispatch(new Navigate([Pages.AssetIcon]));
    }
}
