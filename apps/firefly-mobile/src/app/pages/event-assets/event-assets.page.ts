import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StateStorage, StorageImage, TimestampFormat } from '@theory/firebase';
import {
  StateUserEvents,
  ActionEventSetId,
  StateInterest,
  ActionEventPatch,
  ActionInterestEventsGet
} from '@firefly/shared';
import { Event, Interest } from '@firefly/cloud';

@Component({
  selector: 'app-page-event-assets',
  templateUrl: 'event-assets.page.html',
  styleUrls: ['./event-assets.page.scss']
})
export class PageEventAssets {
  @Select(StateUserEvents.data()) events$: Observable<Array<Event>>;
  @Select(StateStorage.images) images$: Observable<
    Record<string, StorageImage>
  >;

  public TimestampFormat: any = TimestampFormat;

  public images: Record<string, StorageImage> = {};
  public userEvents: Array<Event>;
  public urls$: Observable<Array<string>>;
  public urls: Array<string> = [];

  constructor(private store: Store, private modalController: ModalController) {}

  /*
    public ngOnInit(): void
    {
      this.store.dispatch(new ActionUserEventsGetData()).pipe(
        switchMap(() => {

            this.userEvents = this.store.selectSnapshot(StateUserEvents.data());
            this.images = this.store.selectSnapshot(StateStorage.images);

            this.userEvents.forEach(userEvent => {
              this.urls.push(this.images[userEvent.bucketPath].small);
            })

            return this.urls$ = of(this.urls);
        })
      ).subscribe();
    }
*/

  /*
    public ionViewWillEnter(): void
    {
    }
*/
  public eventClicked(event: Event): void {
    //console.log(`event ${index} clicked`);

    //const id: string = this.userEvents[index].id;
    //const bucketPath = this.userEvents[index].bucketPath;
    const id: string = event.id;
    // const bucketPath = event.bucketPath;

    const interests: string[] = event.interests;

    const interest: Interest = this.store.selectSnapshot(StateInterest.data());
    if (!interests[interest.id]) {
      interests.push(interest.id);

      this.store
        .dispatch(new ActionEventSetId(id))
        .pipe(
          switchMap(() =>
            this.store.dispatch(new ActionEventPatch({ interests }, true))
          ),
          switchMap(() => this.store.dispatch(new ActionInterestEventsGet())),
          switchMap(() => {
            return this.modalController.dismiss();
          })
        )
        .subscribe();
    } else {
      return;
    }
  }
}
