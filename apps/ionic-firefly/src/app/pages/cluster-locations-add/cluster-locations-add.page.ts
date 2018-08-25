import {Component} from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Store, Select } from '@ngxs/store';
import { PlaceSearch, PlaceDetails } from '../../state/places/places.actions';
import { StatePlaces } from '../../state/places/places.state';
import { Observable } from 'rxjs/Observable';

@Component
({
    selector    : 'app-page-cluster-locations-add',
    templateUrl : 'cluster-locations-add.page.html',
    styleUrls   : ['./cluster-locations-add.page.scss']
})

export class PagePublisherClusterLocationsAdd
{
    @Select(StatePlaces.results) results$ : Observable<Array<any>>;

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
        console.log(event);
        this.store.dispatch(new PlaceSearch(event.target.value));
    }

    public add(place: any): void
    {
        console.log(place);

        this.searching = true;

        this.store.dispatch(new PlaceDetails(''));

        this.dismissModal();
    }
}
