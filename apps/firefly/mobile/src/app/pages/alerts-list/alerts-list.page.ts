import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { StateUserAlerts, ActionEventGet, IconType } from '@firefly/core';
import { Alert } from '@firefly/cloud';

import { Pages, ActionMobileLoadingShow } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { BaseComponent } from '@theory/core';
@Component
({
    selector    : 'app-page-alert',
    templateUrl : 'alerts-list.page.html',
    styleUrls   : ['./alerts-list.page.scss']
})

export class PageAlertsList extends BaseComponent implements OnInit
{
    @Select(StateUserAlerts.read) alerts$: Observable<Array<Alert>>;

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
