import { Observable, forkJoin, of } from 'rxjs'
import { takeUntil, switchMap } from 'rxjs/operators'
import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { StateUserIcons, Icon, ActionIconSetId, ActionUserIconsGetData, ActionClusterIconUriSet, ActionClusterIconPathSet, ActionClusterPatch} from '@firefly/core';
import { StateStorage, StorageImage } from '@theory/firebase';
import { BaseComponent } from '@theory/core';
import { url } from 'inspector';
import { IncomingMessage } from 'http';

@Component
({
    selector    : 'app-page-icon-assets',
    templateUrl : 'icon-assets.page.html',
    styleUrls   : ['./icon-assets.page.scss']
})

export class PageIconAssets
{
  @Select(StateUserIcons.data())    userIcons$:  Observable<Array<Icon>>;
  @Select(StateStorage.images)    images$: Observable<Record<string, StorageImage>>;

  public images: Record<string, StorageImage> = {};
  public userIcons: Array<Icon>;
  public urls$: Observable<Array<string>>;
  public urls: Array<string>  = [];

  constructor(private store:Store, private modalController: ModalController){}

    /*public urls: Array<string> =
    [
        'assets/images/temp-icon-1.png',
        'assets/images/temp-icon-2.png',
        'assets/images/temp-icon-3.png',
        'assets/images/temp-icon-4.png',
        'assets/images/temp-icon-5.png',
        'assets/images/temp-icon-6.png',
        'assets/images/temp-icon-7.png'
    ];*/

    public ngOnInit(): void
    {

      this.store.dispatch(new ActionUserIconsGetData()).pipe(
        switchMap(() => {

            this.userIcons = this.store.selectSnapshot(StateUserIcons.data());
            this.images = this.store.selectSnapshot(StateStorage.images);

            this.userIcons.forEach(userIcon => {
              this.urls.push(this.images[userIcon.bucketPath].small);
            })

            return this.urls$ = of(this.urls);
        })
      ).subscribe();
    }

    public ionViewWillEnter(): void
    {
    }

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);

        const id: string = this.userIcons[index].id;
        const bucketPath = this.userIcons[index].bucketPath;

        this.store.dispatch(new ActionIconSetId(id)).pipe
        (
            switchMap(() => this.store.dispatch
            ([
                new ActionClusterPatch({ bucketPath })
            ])),
            switchMap(() => {
              return this.modalController.dismiss()})
        ).subscribe();
    }
}
