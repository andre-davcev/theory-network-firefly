import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { tap } from 'rxjs/operators';

@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.page.html',
    styleUrls   : ['./publisher.page.scss']
})

export class PagePublisher implements OnInit
{
    public  segment:string = 'clusters';
    private translations: Array<string> = [];

    constructor(private actionSheetController: ActionSheetController, private translate: TranslateService, private router: Router) { }

    ngOnInit(): void
    {
        this.translate.get
        ([
            'page.assets.add',
            'page.assets.icon',
            'page.assets.image',
            'page.assets.coupon',
            'page.assets.beacon',
            'page.assets.place',
            'page.assets.event',
            'general.cancel'
        ]).
        subscribe((translations: Array<string>) => this.translations = translations);
    }

    ionViewWillEnter()
    {
//        this.statusBar.styleLightContent();
    }

    public add()
    {
        const segment:string = this.segment.substring(0, this.segment.length - 1);

        if (segment === 'cluster')
        {
            this.router.navigate(['/publisher/' + segment]);
        }
        else
        {
            this.presentActionSheet();
        }
    }

    public presentActionSheet()
    {
        const translations: Array<string> = this.translations;

        fromPromise(this.actionSheetController.create
        ({
            header : translations['page.assets.add'],

            buttons:
            [
                {text: translations['page.assets.icon'],   handler: () => {}},
                {text: translations['page.assets.image'],  handler: () => {}},
/*
                {text: translations['page.assets.coupon'], handler: () => {}},
                {text: translations['page.assets.beacon'], handler: () => {}},
*/
                {text: translations['page.assets.place'],  handler: () => {}},
                {text: translations['page.assets.event'],  handler: () => {}},
                {text: translations['general.cancel'],      role: 'cancel'}
            ]
        })).
        pipe(tap((actionSheet: HTMLIonActionSheetElement) => actionSheet.present()));
    }

    public dismissModal(): void
    {
//        this.viewController.dismiss();
//        this.statusBar.styleDefault();
    }
}
