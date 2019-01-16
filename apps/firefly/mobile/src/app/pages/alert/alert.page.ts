import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IonSlides, AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Alert, StateAlerts } from '@firefly/core';

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
  @ViewChild(IonSlides) slides: IonSlides;

  segment:string = 'fired';

  @Select(StateAlerts.alerts) alerts$: Observable<Array<Alert>>;

  public Pages: any = Pages;

  public slideOptions: any = { zoom: false };

    constructor(
      public alertController: AlertController,
      private store: Store ) { }

    public ionViewWillEnter(): void
    {
//        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

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
