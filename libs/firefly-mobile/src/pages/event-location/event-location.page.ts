import { Component, Input } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { ModalController } from '@ionic/angular';
import { Result } from '@mapbox/mapbox-gl-geocoder';
import { Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { Place } from '@firefly/cloud';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionEventPlaceSet,
  PlaceTypes,
  ServiceLocation
} from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { MapboxPlaceType } from '@theory/mapbox';

@Component({
  selector: 'app-page-event-location',
  templateUrl: 'event-location.page.html',
  styleUrls: ['./event-location.page.scss']
})
export class PageEventLocation extends BaseComponent {
  @Input() virtual: boolean = false;
  @Input() place!: Place;

  public placeTypes!: Array<MapboxPlaceType>;

  constructor(
    private store: Store,
    private modal: ModalController,
    private location: ServiceLocation
  ) {
    super();
  }

  public ionViewWillEnter(): void {
    this.placeTypes = this.virtual ? PlaceTypes.virtual : PlaceTypes.physical;

    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Dark }));

    // Keyboard.setScroll({ isDisabled: true });
    // Keyboard.setResizeMode({ mode: KeyboardResize.None });
  }

  public ionViewWillLeave(): void {
    // Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
    // Keyboard.setScroll({ isDisabled: false });
  }

  public resultFound(result: Result): void {
    this.place = ServiceLocation.place(result);
  }

  public cancel(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));

    this.modal.dismiss();
  }

  public done(): void {
    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.location.addCity(this.place)),
        switchMap((place: Place) =>
          this.store.dispatch(new ActionEventPlaceSet(place))
        ),
        switchMap(() =>
          this.store.dispatch([
            new ActionDeviceStatusBarSet({ style: Style.Light }),
            new ActionAppLoadingHide()
          ])
        ),
        tap(() => this.modal.dismiss())
      )
      .subscribe();
  }
}
