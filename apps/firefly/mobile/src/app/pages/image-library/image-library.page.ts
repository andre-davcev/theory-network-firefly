import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActionPhotosGetLibrary, StatePhotos } from '@theory/capacitor/state/photos';
import { Observable } from 'rxjs';

@Component
({
    selector    : 'app-page-image-library',
    templateUrl : 'image-library.page.html',
    styleUrls   : ['./image-library.page.scss']
})

export class PageImageLibrary implements OnInit
{
    @Select(StatePhotos.libraryThumbnailUrls) libraryThumbnailUrls$: Observable<Array<string>>;

    constructor(private store: Store) { }

    public ngOnInit(): void
    {
        this.store.dispatch(new ActionPhotosGetLibrary());
    }

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }
}
