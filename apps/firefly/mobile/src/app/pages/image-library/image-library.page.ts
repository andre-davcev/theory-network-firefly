import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActionGridIconLibraryWatch, StateGrid, ActionGridIconLibraryPage } from '@firefly/core';

@Component
({
    selector    : 'app-page-image-library',
    templateUrl : 'image-library.page.html',
    styleUrls   : ['./image-library.page.scss']
})

export class PageImageLibrary implements OnInit
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
