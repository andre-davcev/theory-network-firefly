import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Navigate, RouterNavigation } from '@ngxs/router-plugin';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';

import {
  ActionMobileAuthSelected,
  ActionMobileMenuClosed,
  ActionMobileMenuOpened
} from '@firefly/mobile';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionCityWatch,
  ActionUserAuthenticate,
  ActionUserLogout,
  Color,
  IconSize,
  IconType,
  Pages,
  StateUser
} from '@firefly/shared';
import { PlatformEnum } from '@theory/ionic';

import { PageLogin } from '@firefly/mobile';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ComponentApp {
  @Select(StateUser.found()) userFound$: Observable<boolean>;

  public Pages = Pages;
  public IconType = IconType;
  public IconSize = IconSize;
  public Color = Color;

  constructor(
    private platform: Platform,
    private actions$: Actions,
    private store: Store,
    private menu: MenuController,
    private modal: ModalController
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    if (this.platform.is(PlatformEnum.Cordova)) {
      from(this.platform.ready())
        .pipe(
          delay(100),
          tap(() => SplashScreen.hide()),
          switchMap(() =>
            this.store.dispatch([
              new ActionCityWatch(),
              new ActionUserAuthenticate()
            ])
          )
        )
        .subscribe();
    } else {
      this.store.dispatch([
        new ActionCityWatch(),
        new ActionUserAuthenticate()
      ]);
    }

    this.actions$
      .pipe(ofActionSuccessful(RouterNavigation))
      .subscribe((data: any) => console.log(data.event.url));

    this.actions$
      .pipe(
        ofActionSuccessful(ActionMobileAuthSelected),
        switchMap(({ page }: ActionMobileAuthSelected) =>
          from(
            this.modal.create({
              component: PageLogin,
              componentProps: { page }
            })
          )
        ),
        switchMap((modal: HTMLIonModalElement) => modal.present())
      )
      .subscribe();
  }

  public go(): void {
    this.menu.close();
  }

  public logout(): void {
    this.menu.close();

    this.store
      .dispatch(new ActionAppLoadingShow())
      .pipe(
        switchMap(() => this.store.dispatch(new ActionUserLogout())),
        switchMap(() =>
          this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]))
        ),
        finalize(() => this.store.dispatch(new ActionAppLoadingHide()))
      )
      .subscribe();
  }

  public menuOpened(): void {
    this.store.dispatch(new ActionMobileMenuOpened());
  }

  public menuClosed(): void {
    this.store.dispatch(new ActionMobileMenuClosed());
  }
}
