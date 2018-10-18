import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ViewController } from '@ionic/core';

import { ActionPlaceSearch, ActionPlaceDetails } from '../../state/places/places.actions';
import { StatePlaces } from '../../state/places/places.state';


@Component
({
    selector    : 'app-page-cluster-locations-add',
    templateUrl : 'cluster-locations-add.page.html',
    styleUrls   : ['./cluster-locations-add.page.scss']
})

export class PagePublisherClusterLocationsAdd implements OnInit
{
    @Select(StatePlaces.results) results$ : Observable<Array<any>>;

    private searching : boolean = false;

    constructor(private viewController: ViewController, private store: Store) {}

    public ngOnInit(): void
    {
        this.results$.subscribe(v => console.log(v));
    }

    public dismissModalWithCheck(): void
    {
        if (!this.searching)
        {
            this.dismissModal();
        }

        this.searching = false;
    }

    public dismissModal(): void
    {
        this.store.dispatch(new ActionPlaceSearch(''));
//        this.viewController.dismiss();
    }

    public clickedSearch(): void
    {
        this.searching = true;
    }

    public search(event: any): void
    {
        console.log(event);
        this.store.dispatch(new ActionPlaceSearch(event.target.value));
    }

    public add(place: any): void
    {
        console.log(place);

        this.searching = true;

        this.store.dispatch(new ActionPlaceDetails(''));

        this.dismissModal();
    }
}
