import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StatePlaces, ActionPlaceSearch, ActionPlaceDetails } from '@firefly/core';

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

    constructor(private store: Store) {}

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
