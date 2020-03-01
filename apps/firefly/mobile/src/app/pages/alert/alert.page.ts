import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { tap, switchMap, takeUntil, filter, map } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType, ActionUserAlertsRemove, ActionAlertSetId, ActionAlertDelete, ActionUserAlertsMarkRead, ActionAlertMarkRead, StateAlert } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@theory/core';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alert.page.html',
    styleUrls   : ['./alert.page.scss']
})

export class PageAlert extends BaseComponent implements OnInit
{
    @Select(StateAlert.formGroup())  form$:   Observable<FormGroup>;
    @Select(StateUserAlerts.data())  alerts$: Observable<Array<Alert>>;
    @Select(StateUserAlerts.found()) found$:  Observable<boolean>;
    @Select(StateUserAlerts.empty()) empty$:  Observable<boolean>;

    @ViewChild('sliderRef', { static: true }) protected sliderRef: IonSlides;

    public segment: string = 'fired';
    public Pages: any = Pages;
    public slideOptions: any = { zoom: false };
    public alerts: Array<Alert>;

    public IconType : any = IconType;

    constructor(private store: Store, private modal: ModalController)
    {
      super();
    }

    public ngOnInit(): void
    {
      this.alerts$
      .pipe(
        takeUntil(this.destroy$),
        map((alerts: Array<Alert>) => alerts.filter(alert => !alert.read)
      )).
        subscribe((alerts: Array<Alert>) =>
          this.alerts = alerts
      )
    }

    public async ionViewWillEnter(): Promise<void>
    {
      const index = await this.sliderRef.getActiveIndex();

      if(!this.alerts[index] || this.alerts[index].read)
        return;

        this.store.dispatch(new ActionAlertSetId(this.alerts[index].id)).pipe
        (
          switchMap(() =>
            this.store.dispatch(new ActionAlertMarkRead())
          ),
          switchMap(() =>
            this.store.dispatch(new ActionUserAlertsMarkRead())
          )
        ).subscribe();
    }

    /*public ionViewWillExit(): Promise<void>
    {

    }*/

    public async slideChanged(): Promise<void>
    {
      const index = await this.sliderRef.getActiveIndex();

      if(this.alerts[index].read)
        return;

      this.store.dispatch(new ActionAlertSetId(this.alerts[index].id)).pipe
      (
        switchMap(() =>
          this.store.dispatch(new ActionAlertMarkRead())
        ),
        switchMap(() =>
          this.store.dispatch(new ActionUserAlertsMarkRead())
        )
      ).subscribe();
    }

    public alertDetail(alert:Alert): void
    {
      this.store.dispatch(new ActionEventGet(alert.eventId)).pipe
      (
        switchMap(() =>
          this.store.dispatch(new ActionAlertSetId(alert.id))
        ),
        switchMap(() =>
          this.store.dispatch(new ActionAlertMarkRead())
        ),
        switchMap(() =>
        this.store.dispatch(new ActionUserAlertsMarkRead())
        ),
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

    public alertDelete(alert:Alert): void
    {
      const id: string = alert.id;

      this.store.dispatch(new ActionAlertSetId(id)).pipe
      (
        switchMap(() =>
          this.store.dispatch(new ActionAlertDelete())
        ),
        switchMap(() =>
          of(alert)
        ),
        filter((alert) => !alert.read),
        switchMap(() =>
          this.store.dispatch(new ActionUserAlertsMarkRead())
        )
      ).subscribe();
    }

    public navigate(page: Pages.AlertsList | Pages.AlertDetail, object: Alert): void
    {
      if(page === Pages.AlertsList)
        this.store.dispatch(new Navigate([page]));
      else
        this.store.dispatch(new ActionEventGet(object.eventId)).pipe
        (
          switchMap(() => this.store.dispatch(new Navigate([page, object.id])))
        ).subscribe();
    }
}
