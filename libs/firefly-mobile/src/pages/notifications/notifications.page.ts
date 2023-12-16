import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  IonSlides,
  MenuController,
  ModalController
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Alert } from '@firefly/cloud';
import {
  ActionAlertsSlideIndex,
  ActionAlertsSlideRestore,
  ActionUserAlertsDelete,
  ActionUserAlertsGo,
  IconType,
  Pages,
  StateAlerts,
  StateUser,
  Translation
} from '@firefly/shared';
import { StateLocation } from '@theory/capacitor';
import { BaseComponent } from '@theory/core';
import { ActionMobileAuthSelect, StateMobile } from '../../state';

@Component({
  selector: 'app-page-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class PageNotifications extends BaseComponent {
  @Select(StateAlerts.data) data$!: Observable<Array<Alert>>;
  @Select(StateAlerts.exists) exists$!: Observable<boolean>;
  @Select(StateLocation.permissionDenied) locationDenied$!: Observable<boolean>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;

  @ViewChild('slider', { static: false })
  protected sliderRef!: IonSlides;

  public slideOptions: any = { zoom: false };

  public Pages: any = Pages;
  public IconType: any = IconType;

  // https://github.com/ionic-team/ionic/issues/20356
  public didInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private modal: ModalController,
    private translate: TranslateService,
    private alert: AlertController,
    private menu: MenuController
  ) {
    super();
  }

  public ionViewWillEnter(): void {
    // https://github.com/ionic-team/ionic/issues/20356
    this.didInit$.next(true);

    setTimeout(() =>
      this.store.dispatch(new ActionAlertsSlideRestore(this.sliderRef))
    );
  }

  public slideChanged(): void {
    from(this.sliderRef.getActiveIndex())
      .pipe(
        filter(
          (index: number) =>
            index !== this.store.selectSnapshot(StateAlerts.index)
        ),
        switchMap((index: number) =>
          this.store.dispatch(new ActionAlertsSlideIndex(index))
        )
      )
      .subscribe();
  }

  public go(alert: Alert) {
    this.store.dispatch(new ActionUserAlertsGo(alert));
  }

  public delete(alert: Alert): void {
    this.translate
      .get([
        Translation.AlertConfirmDeleteHeader,
        Translation.AlertConfirmDeleteMessage,
        Translation.AlertConfirmDeleteCancel,
        Translation.AlertConfirmDeleteConfirm,
        Translation.AlertConfirmDeleteEvent
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.alert.create({
            cssClass: 'cpt-alert',
            header: `${translations[Translation.AlertConfirmDeleteHeader]} ${
              translations[Translation.AlertConfirmDeleteEvent]
            }?`,
            message: translations[Translation.AlertConfirmDeleteMessage],

            buttons: [
              {
                text: translations[Translation.AlertConfirmDeleteCancel],
                role: 'cancel'
              },
              {
                text: translations[Translation.AlertConfirmDeleteConfirm],
                handler: () =>
                  this.store.dispatch(new ActionUserAlertsDelete(alert.id))
              }
            ]
          })
        ),
        switchMap((alert: HTMLIonAlertElement) => from(alert.present()))
      )
      .subscribe();
  }

  public done(): void {
    this.modal.dismiss();
  }

  public menuOpen(): void {
    const isUser: boolean = this.store.selectSnapshot(StateUser.isUser);

    if (isUser) {
      this.menu.open();
    } else {
      this.store.dispatch(new ActionMobileAuthSelect());
    }
  }
}
