import {Component, ElementRef, ViewChild} from '@angular/core';
import { ViewController, Searchbar } from 'ionic-angular';
import { Store, Select } from '@ngxs/store';
import { PlaceSearch } from '../../state/places/places.actions';
import { StatePlaces } from '../../state/places/places.state';
import { Observable } from 'rxjs/Observable';

@Component
({
    selector    : 'app-page-cluster-locations-add',
    templateUrl : 'cluster-locations-add.page.html'
})

export class PagePublisherClusterLocationsAdd
{
    @Select(StatePlaces.results) results$ : Observable<Array<google.maps.places.QueryAutocompletePrediction>>;

    private searching : boolean = false;

    constructor(private viewController: ViewController, private store: Store) {}

    public ionViewDidLoad()
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
        this.store.dispatch(new PlaceSearch(''));
        this.viewController.dismiss();
    }

    public clickedSearch(): void
    {
        this.searching = true;
    }

    public search(event: any): void
    {
        this.store.dispatch(new PlaceSearch(event.target.value));
    }

    public add(place: google.maps.places.QueryAutocompletePrediction): void
    {
        console.log(place);

        this.searching = true;

        this.dismissModal();
    }
}
