import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

@Component
({
    selector    : 'app-page-icon-library',
    templateUrl : 'icon-library.page.html',
    styleUrls   : ['./icon-library.page.scss']
})

export class PageIconLibrary implements OnInit
{
    public iconLibrary$: Observable<Array<string>> = of([]);

    constructor(private store: Store) { }

    public ngOnInit(): void
    {

    }

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }

    public doInfinite(infiniteScroll: any): void
    {
/*
        this.store.dispatch(new ActionGridIconLibraryPage()).

        subscribe(() => infiniteScroll.target.complete());
*/
    }
}
