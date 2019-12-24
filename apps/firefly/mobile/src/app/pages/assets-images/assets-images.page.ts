import {Component, OnInit} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateMobile, Pages } from '@firefly/mobile';
import { StateUserImages } from '@firefly/core';
import { Image } from '@firefly/cloud';
import { StateStorage, StorageImage } from '@theory/firebase';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

@Component
({
    selector    : 'app-page-assets-images',
    templateUrl : 'assets-images.page.html',
    styleUrls   : ['./assets-images.page.scss']
})

export class PageAssetsImages extends BaseComponent implements OnInit
{
    @Select(StateUserImages.data()) userImages$: Observable<Array<Image>>;
    @Select(StateStorage.images)   images$:    Observable<Record<string, StorageImage>>;
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    public images: Record<string, StorageImage> = {};
    public userImages: Array<Image>;
    public urls$: Observable<Array<string>>;
    public urls: Array<string>  = [];

    constructor
    (
        private store : Store,
        private menu  : MenuController
    )
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

    navigate(): void{
      this.store.dispatch(new Navigate([Pages.AssetImage]));
    }

    add(): void
    {

    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
