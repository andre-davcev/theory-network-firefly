import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { ActionEventPlaceSet, PlaceTypes, ServiceLocation } from '@firefly/core';
import { MapboxPlaceType } from '@theory/mapbox';
import { BaseComponent } from '@theory/core';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';
import { switchMap, tap } from 'rxjs/operators';
import { Place } from '@firefly/cloud';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

@Component
({
    selector    : 'app-page-event-location',
    templateUrl : 'event-location.page.html',
    styleUrls   : ['./event-location.page.scss']
})

export class PageEventLocation extends BaseComponent
{
    @Input() virtual : boolean = false;
    @Input() place   : Place;

    public placeTypes: Array<MapboxPlaceType> = null;

    constructor
    (
        private store:    Store,
        private modal:    ModalController,
        private location: ServiceLocation
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        this.placeTypes = this.virtual ?
            PlaceTypes.virtual :
            PlaceTypes.physical;

        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));

        // Keyboard.setScroll({ isDisabled: true });
        // Keyboard.setResizeMode({ mode: KeyboardResize.None });
    }

    public ionViewWillLeave(): void
    {
        // Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
        // Keyboard.setScroll({ isDisabled: false });
    }

    public resultFound(result: Result): void
    {
        this.place = ServiceLocation.place(result);
    }

    public cancel(): void
    {
        this.store.dispatch
        (
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Light})
        );

        this.modal.dismiss();
    }

    public done(): void
    {
        this.store.dispatch(new ActionMobileLoadingShow()).pipe
        (
            switchMap(() =>
                this.location.addCity(this.place)
            ),
            switchMap((place: Place) =>
                this.store.dispatch(new ActionEventPlaceSet(place))
            ),
            switchMap(() =>
                this.store.dispatch
                ([
                    new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}),
                    new ActionMobileLoadingHide()
                ])
            ),
            tap(() =>
                this.modal.dismiss()
            )
        ).
        subscribe();
    }
}
