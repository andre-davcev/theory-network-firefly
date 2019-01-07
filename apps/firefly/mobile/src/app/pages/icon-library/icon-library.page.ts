import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActionGridIconLibraryWatch, StateGrid, ActionGridIconLibraryPage } from '@firefly/core';

@Component
({
    selector    : 'app-page-icon-library',
    templateUrl : 'icon-library.page.html',
    styleUrls   : ['./icon-library.page.scss']
})

export class PageIconLibrary implements OnInit
{
    @Select(StateGrid.iconLibrary) iconLibrary$: Observable<Array<string>>;

    constructor(private store: Store) { }

    public ngOnInit(): void
    {
        this.store.dispatch(new ActionGridIconLibraryWatch());
    }

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }

    public doInfinite(infiniteScroll: any): void
    {
        this.store.dispatch(new ActionGridIconLibraryPage()).

        subscribe(() => infiniteScroll.target.complete());
    }
}
