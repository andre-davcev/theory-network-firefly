import { User as FirebaseUser } from 'firebase/app';
import { Component } from '@angular/core';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages, ActionMobileNavigateRoot } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { CoreEnum, BaseComponent } from '@theory/core';
import { StateMobile } from '@firefly/mobile';
import { Observable, from } from 'rxjs';
import { StateUserAlerts, StateUser } from '@firefly/core';
import { take, filter, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome extends BaseComponent
{
    @Select(StateMobile.menuOpen)      menuOpen$      : Observable<boolean>;
    @Select(StateMobile.pageAlerts)    pageAlerts$    : Observable<boolean>;
    @Select(StateMobile.pageStream)    pageStream$    : Observable<boolean>;
    @Select(StateUserAlerts.unread)    unread$        : Observable<number>;
    @Select(StateUserAlerts.hasUnread) hasUnread$     : Observable<boolean>;
    @Select(StateUser.authenticated)   authenticated$ : Observable<boolean>;
    @Select(StateUser.authData)        authData$      : Observable<FirebaseUser>;

    public Pages : any = Pages;

    constructor
    (
        private menu        : MenuController,
        private actionSheet : ActionSheetController,
        private store       : Store,
        private translate   : TranslateService
    )
    {
        super();
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(type: Pages): void
    {
        const url: Array<any> = type === Pages.AssetEvent ? [ type, CoreEnum.IdNew ] : [ type ];

        this.store.dispatch(new Navigate(url));
    }

    public go(type: Pages.Alert | Pages.Stream): void
    {
        this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, type))
    }

    deleteConfirm()
    {
        /*
        let confirm = this.alertController.create
        ({
            title   : dictionary.deleteConfirmTitle,
            message : dictionary.deleteConfirmMessage,
            buttons :
            [
                {
                    text    : dictionary.deleteConfirmDisagree,
                    handler : () => {}
                },

                {
                    text    : dictionary.deleteConfirmAgree,
                    handler : () =>
                    {
                        let
                        index = this.slides.getActiveIndex();

                        this.alertsObject.delete(index);

                        if (this.slides.isEnd())
                        {
                            this.slides.slideTo(index - 1);
                        }

                        this.slides.update();
                    }
                }
            ]
        });

        confirm.present();
*/
    }

    public menuOpen(): void
    {
        this.authenticated$.pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    from(this.menu.open()) :
                    this.authSelect()
            )
        ).subscribe();
    }

    private authOpen(page: Pages.Login | Pages.SignUp): void
    {

    }

    private authSelect(): Observable<any>
    {
        return this.translate.
        get
        ([
            'general.authenticate',
            'general.login',
            'general.signup'
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                from(this.actionSheet.create
                  ({
                      header: translations['general.authenticate'],

                      buttons:
                      [
                          {
                              text    : translations['general.login'],
                              handler : () => this.authOpen(Pages.Login)
                          },
                          {
                              text    : translations['general.signup'],
                              handler : () => this.authOpen(Pages.SignUp)
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        );
    }
}
