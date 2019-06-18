import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages } from '../pages.enum';
import { Navigate } from '@ngxs/router-plugin';
import { CoreEnum, BaseComponent } from '@theory/core';
import { StateUser } from '@firefly/core';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, take } from 'rxjs/operators';
import { ActionMobileLoadingShow, ActionMobileLoadingHide } from '@firefly/mobile';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome extends BaseComponent implements OnInit
{
    @Select(StateUser.homeLoaded) ready$: Observable<boolean>;

    public Pages:      any     = Pages;
    public showAlerts: boolean = false;

    public child: Pages.Alert | Pages.Stream = Pages.Alert;

    constructor
    (
        private alert: AlertController,
        private menu: MenuController,
        private store: Store
    )
    {
        super();
    }

    ngOnInit(): void
    {
        this.ready$.
        pipe
        (
            takeUntil(this.destroy$),
            filter((ready: boolean) => !ready),
            switchMap(() => this.store.dispatch(new ActionMobileLoadingShow())),
            switchMap(() => this.ready$),
            filter((ready: boolean) => ready),
            take(1),
        ).
        subscribe(() =>
            this.store.dispatch(new ActionMobileLoadingHide())
        );
    }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));

        if (!this.showAlerts)
        {
            this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]));
        }
    }

    public navigate(type: Pages): void
    {
        const url: Array<any> = type === Pages.AssetEvent ? [ type, CoreEnum.IdNew ] : [ type ];

        this.store.dispatch(new Navigate(url));
    }

    alertStreamToggle(type: Pages.Alert | Pages.Stream)
    {
        this.child = type;
        this.store.dispatch(new Navigate([Pages.Home, type]));

        this.showAlerts = type === Pages.Alert;
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

    public menuOpen()
    {
      this.menu.open();
    }
}
