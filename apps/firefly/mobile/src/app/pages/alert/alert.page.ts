import { Component, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IonSlides, AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';

import { Alert, StateUser } from '@firefly/core';

import { Pages } from '../pages.enum';
import { Navigate } from '@ngxs/router-plugin';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert
{
    @Select(StateUser.alerts) alerts$: Observable<Array<Alert>>;

    @ViewChild(IonSlides) slides: IonSlides;

    public segment: string = 'fired';
    public Pages: any = Pages;
    public slideOptions: any = { zoom: false };

    constructor(private store: Store) { }

    public slideChanged(): void
    {
        from(this.slides.getActiveIndex()).

        pipe(tap((index: number) => console.log('Slide Changed: ' + index)));
    }

    public navigate(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetEvent]));
    }
}
