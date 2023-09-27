import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Style } from '@capacitor/status-bar';
import { AlertController, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ActionUserDelete,
  ActionUserIsPublisherSet,
  Color,
  IconType,
  StateUser,
  StateUserProfile,
  Translation
} from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { StateMobile } from '../../state';

@Component({
  selector: 'app-page-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class PageUserProfile {
  @Select(StateUserProfile.formGroup()) form$!: Observable<UntypedFormGroup>;
  @Select(StateUser.formGroup()) formUser$!: Observable<UntypedFormGroup>;
  @Select(StateUser.email) email$!: Observable<string>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;

  public IconType: any = IconType;
  public Color: any = Color;

  constructor(
    private menu: MenuController,
    private store: Store,
    private translate: TranslateService,
    private alert: AlertController
  ) {}

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public menuOpen(): void {
    this.menu.open();
  }
  /*
    public selectIcon(): void
    {

    }
*/
  public toggleIsPublisher(event: any): void {
    const isPublisher: boolean = event.detail.checked;

    this.store.dispatch(new ActionUserIsPublisherSet(isPublisher));
  }

  public deleteAccount(): void {
    this.translate
      .get([
        Translation.AlertConfirmDeleteHeaderUser,
        Translation.AlertConfirmDeleteMessageUser,
        Translation.AlertConfirmDeleteCancelUser,
        Translation.AlertConfirmDeleteConfirmUser
      ])
      .pipe(
        switchMap((translations: Record<string, string>) =>
          this.alert.create({
            cssClass: 'cpt-alert',
            header: translations[Translation.AlertConfirmDeleteHeaderUser],
            message: translations[Translation.AlertConfirmDeleteMessageUser],

            buttons: [
              {
                text: translations[Translation.AlertConfirmDeleteCancelUser],
                role: 'cancel'
              },
              {
                text: translations[Translation.AlertConfirmDeleteConfirmUser],
                handler: () => this.store.dispatch(new ActionUserDelete())
              }
            ]
          })
        ),
        switchMap((alert: HTMLIonAlertElement) => from(alert.present()))
      )
      .subscribe();
  }
}
