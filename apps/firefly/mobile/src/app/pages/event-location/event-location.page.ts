import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle, Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateEvent, ActionEventLocationSet } from '@firefly/core';
import { StateMap, ActionMapPlaceSetWithSearchResult, ActionMapSearchResultSetWithPlace, MapboxPlaceType } from '@theory/mapbox';
import { BaseComponent } from '@theory/core';

const { Keyboard } = Plugins;

@Component
({
    selector    : 'app-page-event-location',
    templateUrl : 'event-location.page.html',
    styleUrls   : ['./event-location.page.scss']
})

export class PageEventLocation extends BaseComponent implements OnInit
{
    @Select(StateEvent.locationDefined)      locationDefined$:     Observable<boolean>;
    @Select(StateMap.searchResult)           searchResult$:        Observable<Result>;
    @Select(StateMap.searchResultDefined)    searchResultDefined$: Observable<boolean>;

    public disableDone$: Observable<boolean>;
    public result: Result;

    constructor
    (
        private store: Store,
        private modalController: ModalController
    )
    {
        super();
    }

    public ngOnInit(): void
    {
        this.disableDone$ = combineLatest
        (
            this.locationDefined$,
            this.searchResultDefined$,
            (locationDefined, searchResultDefined) => !locationDefined && !searchResultDefined
        );
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));

        // Keyboard.setScroll({ isDisabled: true });
        // Keyboard.setResizeMode({ mode: KeyboardResize.None });
    }

    public ionViewWillLeave(): void
    {
        // Keyboard.setResizeMode({ mode: KeyboardResize.Ionic });
        // Keyboard.setScroll({ isDisabled: false });
    }

    public locationFound(result: Result): void
    {
        this.result = result;
    }

    public cancel(): void
    {
        this.store.dispatch
        ([
            new ActionMapSearchResultSetWithPlace(),
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Light})
        ]);

        this.modalController.dismiss();
    }

    public save(): void
    {
        this.store.dispatch
        ([
            new ActionEventLocationSet(this.result),
            new ActionMapPlaceSetWithSearchResult(),
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Light})
        ]);

        this.modalController.dismiss();
    }
}
