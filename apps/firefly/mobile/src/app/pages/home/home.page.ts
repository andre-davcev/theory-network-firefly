import { Component, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Slides, AlertController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';
import { Alert, StateAlerts } from '@firefly/core';
import { Router } from '@angular/router';

export enum PagesHome
{
    Search        = 'search',
    Publish       = 'publish',
    Subscriptions = 'subscriptions',
    Settings      = 'settings'
}

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome
{
    @ViewChild(Slides) slides: Slides;

    segment:string = 'fired';

    @Select(StateAlerts.alerts) alerts$: Observable<Array<Alert>>;

    public PagesHome: any = PagesHome;

    constructor(public alertController: AlertController, private router: Router) { }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    slideChanged()
    {
        from(this.slides.getActiveIndex()).

        pipe(tap((index: number) => console.log('Slide Changed: ' + index)));
    }

    navigate(type: PagesHome): void
    {
        this.router.navigate([`/home/${type}`]);
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
