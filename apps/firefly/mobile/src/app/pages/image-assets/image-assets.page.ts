import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateUserImages, ActionUserImagesGetData, ActionImageSetId, ActionEventPatch } from '@firefly/core';
import { Observable, of } from 'rxjs';
import { StorageImage, StateStorage } from '@theory/firebase';
import { ModalController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Image } from '@firefly/cloud';

@Component
({
    selector    : 'app-page-image-assets',
    templateUrl : 'image-assets.page.html',
    styleUrls   : ['./image-assets.page.scss']
})

export class PageImageAssets
{

    @Select(StateUserImages.data())    userImages$:  Observable<Array<Image>>;
    @Select(StateStorage.images)    images$: Observable<Record<string, StorageImage>>;

    public images: Record<string, StorageImage> = {};
    public userImages: Array<Image>;
    public urls$: Observable<Array<string>>;
    public urls: Array<string>  = [];

    constructor(private store:Store, private modalController: ModalController){}

    public ngOnInit(): void
    {

      this.store.dispatch(new ActionUserImagesGetData()).pipe(
        switchMap(() => {

            this.userImages = this.store.selectSnapshot(StateUserImages.data());
            this.images = this.store.selectSnapshot(StateStorage.images);

            this.userImages.forEach(userImages => {
              this.urls.push(this.images[userImages.bucketPath].small);
            })

            return this.urls$ = of(this.urls);
        })
      ).subscribe();
    }

    public imageClicked(index: number): void
    {
        console.log(`image ${index} clicked`);

        const id: string = this.userImages[index].id;
        const bucketPath = this.userImages[index].bucketPath;

        this.store.dispatch(new ActionImageSetId(id)).pipe
        (
            switchMap(() => this.store.dispatch
            ([
                new ActionEventPatch({ bucketPath })/*,
                new ActionClusterDirty()*/
            ])),
            switchMap(() => {
              return this.modalController.dismiss()})
        ).subscribe();
    }
}
