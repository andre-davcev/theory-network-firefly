import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateEvent, Location, ActionEventSetLocation } from '@firefly/core';
import { StateMap, ActionMapPlaceSetWithSearchResult, ActionMapSearchResultSetWithPlace } from '@theory/mapbox';
import { BaseComponent } from '@theory/core';

@Component
({
    selector    : 'app-page-event-location',
    templateUrl : 'event-location.page.html',
    styleUrls   : ['./event-location.page.scss']
})

export class PageEventLocation extends BaseComponent implements OnInit
{
    @Select(StateEvent.form)                 form$:                Observable<FormGroup>;
    @Select(StateEvent.eventLocations)       locations$:           Observable<Array<Location>>;
    @Select(StateEvent.eventLocationDefined) locationDefined$:     Observable<boolean>;

    @Select(StateMap.searchResult)           searchResult$:        Observable<Result>;
    @Select(StateMap.searchResultDefined)    searchResultDefined$: Observable<boolean>;

    public disableDone$: Observable<boolean>;
    public result: Result;

    constructor(private store: Store, private modalController: ModalController)
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
    }

    public locationFound(result: Result): void
    {
        this.result = result;

/*
    bbox: Array (4)
        0 2.224219
        1 48.815754
        2 2.469753
        3 48.901973
    center: Array (2)
        0 2.35183
        1 48.85658
    context: Array (1)
        0 Object
            id: "country.9759535382641660"
            language: "en"
            language_en: "en"
            short_code: "fr"
            text: "France"
            text_en: "France"
            wikidata: "Q142"
    geometry: Object
        coordinates: [2.35183, 48.85658] (2)
        type: "Point"
    id: "place.9397217726497330"
    language: "en"
    language_en: "en"
    place_name: "Paris, France"
    place_name_en: "Paris, France"
    place_type: Array (2)
        0 "region"
        1 "place"
    properties: Object
        short_code: "FR-75"
        wikidata: "Q90"
    relevance: 1
    text: "Paris"
    text_en: "Paris"
    type: "Feature"
*/
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
        if (this.result != null)
        {
            this.store.dispatch(new ActionEventSetLocation(this.result));
        }

        this.store.dispatch
        ([
            new ActionMapPlaceSetWithSearchResult(),
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Light})
        ]);

        this.modalController.dismiss();
    }
}
