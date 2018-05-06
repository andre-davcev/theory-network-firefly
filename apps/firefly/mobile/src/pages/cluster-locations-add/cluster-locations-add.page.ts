import {Component} from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component
({
    selector    : 'app-page-cluster-locations-add',
    templateUrl : 'cluster-locations-add.page.html'
})

export class PagePublisherClusterLocationsAdd
{
    public searchQuery : string = '';
    public items       : Array<string> = [];
    private searching  : boolean = true;

    constructor(public viewController: ViewController)
    {

    }

    private initializeItems()
    {
        this.items =
        [
            'Amsterdam',
            'Bogota'
        ];
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
        this.viewController.dismiss();
    }

    public clickedSearch(): void
    {
        this.searching = true;
    }

    public filter(event: any): void
    {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const value:any = event.target.value;

        // if the value is an empty string don't filter the items
        if (value && value.trim() !== '')
        {
            this.items = this.items.filter((item) =>
            {
                return (item.toLowerCase().indexOf(value.toLowerCase()) > -1);
            })
        }
        else
        {
            this.items = [];
        }
    }

    public addItems(): void
    {
        this.dismissModal();
    }
}
