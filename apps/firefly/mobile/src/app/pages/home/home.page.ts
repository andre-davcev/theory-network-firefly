import { Component, ViewChild } from '@angular/core';
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
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome
{
    @ViewChild(IonSlides) slides: IonSlides;

    segment:string = 'fired';

    @Select(StateAlerts.alerts) alerts$: Observable<Array<Alert>>;

    public Pages: any = Pages;

    public slideOptions: any = { zoom: false };

    constructor
    (
        public alertController: AlertController,
        private store: Store
    ) { }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    slideChanged()
    {
        from(this.slides.getActiveIndex()).

        pipe(tap((index: number) => console.log('Slide Changed: ' + index)));
    }

    navigate(type: Pages): void
    {
        this.store.dispatch(new Navigate([Pages.Home, type]));
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
}
