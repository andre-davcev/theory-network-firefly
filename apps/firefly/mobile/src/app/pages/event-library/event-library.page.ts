import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

@Component
({
    selector    : 'app-page-event-library',
    templateUrl : 'event-library.page.html',
    styleUrls   : ['./event-library.page.scss']
})

export class PageEventLibrary implements OnInit
{
    public eventLibrary$: Observable<Array<string>> = of([]);

    constructor(private store: Store) { }

    public ngOnInit(): void
    {

    }

    public imageClicked(index: number): void
    {
        console.log(`event ${index} clicked`);
    }

    public doInfinite(infiniteScroll: any): void
    {
/*
        this.store.dispatch(new ActionGridEventLibraryPage()).

        subscribe(() => infiniteScroll.target.complete());
*/
    }
}
