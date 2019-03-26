import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    @Output() select: EventEmitter<number> = new EventEmitter();

    constructor(private store: Store) { }

    public ngOnInit(): void
    {
        this.store.dispatch(new ActionGridIconLibraryWatch());
    }

    public imageClicked(index: number): void
    {
        this.select.next(index);
    }

    public doInfinite(infiniteScroll: any): void
    {
        this.store.dispatch(new ActionGridIconLibraryPage()).

        subscribe(() => infiniteScroll.target.complete());
    }
}
