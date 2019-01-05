import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ActionPhotosGet, StatePhotos } from '@theory/capacitor';
import { Observable } from 'rxjs';

@Component
({
    selector    : 'app-page-image-library',
    templateUrl : 'image-library.page.html',
    styleUrls   : ['./image-library.page.scss']
})

export class PageImageLibrary implements OnInit
{
    @Select(StatePhotos.photoThumbnailUrls) photoThumbnailUrls$: Observable<Array<string>>;

    constructor(private store: Store) { }

    public ngOnInit(): void
    {
        this.store.dispatch(new ActionPhotosGet());
    }

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }
}
