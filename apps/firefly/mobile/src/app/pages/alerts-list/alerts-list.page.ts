import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { tap, switchMap, takeUntil, filter, map } from 'rxjs/operators';
import { IonSlides, ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';

import { StateUserAlerts, ActionEventGet, ActionUserAlertsGo, IconType, ActionUserAlertsRemove, ActionAlertSetId, ActionAlertDelete, ActionUserAlertsMarkRead, ActionAlertMarkRead, StateAlert } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages, ActionMobileLoadingShow } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { PageAlertDetail } from '../alert-detail/alert-detail.page';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@theory/core';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alerts-list.page.html',
    styleUrls   : ['./alerts-list.page.scss']
})

export class PageAlertsList extends BaseComponent implements OnInit
{
    @Select(StateUserAlerts.alertsRead) alerts$: Observable<Array<Alert>>;

    public Pages: any = Pages;
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
    {}

    public navigate(page: Pages.AlertsList | Pages.AlertDetail, object: Alert): void
    {
      this.store.dispatch
      ([
        new ActionMobileLoadingShow(),
        new ActionEventGet(object.eventId)
      ]).pipe
      (
        switchMap(() => this.store.dispatch(new Navigate([page, object.id])))
      ).subscribe();
    }
}
