import { Component, ViewChild } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert
{
    @Select(StateUserAlerts.data()) alerts$: Observable<Array<Alert>>;
    @Select(StateUserAlerts.found()) found$: Observable<boolean>;
    @Select(StateUserAlerts.empty()) empty$: Observable<boolean>;

    @ViewChild(IonSlides, { static: true }) slides: IonSlides;

    public segment: string = 'fired';
    public Pages: any = Pages;
    public slideOptions: any = { zoom: false };

    public IconType : any = IconType;

    constructor(private store: Store, private modal: ModalController) { }

    public slideChanged(): void
    {
        from(this.slides.getActiveIndex()).

        pipe(tap((index: number) => console.log('Slide Changed: ' + index)));
    }

    public alertDetail(alert:Alert): void
    {
      this.store.dispatch(new ActionEventGet(alert.eventId)).pipe
      (
        switchMap(() =>
          from(this.modal.create({
            component: PageAlertDetail
          }))
        )
      ).subscribe((modal: HTMLIonModalElement) => modal.present());
    }

    public alertGo()
    {
      this.store.dispatch(new ActionUserAlertsGo()).subscribe();
    }

    public navigate(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetEvent]));
    }
}
