import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateEvent, ActionSetEventId } from '@firefly/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';
import { ItemHeader, ItemDescription } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-asset-event',
    templateUrl : 'asset-event.page.html',
    styleUrls   : ['./asset-event.page.scss']
})

export class PageAssetEvent extends BaseComponent
{
    @Select(StateEvent.form) form$: Observable<FormGroup>;

    public Pages: any = Pages;

    public itemHeader: ItemHeader =
    {
        title:        'name',
        subtitle:     'tagline',
        iconUrlEmpty: 'assets/icons/avatar-empty.svg',
        iconAsUrl:    true
    };

    public itemDescription: ItemDescription =
    {
        imageAsUrl:  true,
        description: 'description'
    };

    constructor(private store: Store, private translate: TranslateService)
    {
        super();

        this.store.dispatch(new ActionSetEventId('new'));

        this.translate.get
        ([
            'page.event.titlePlaceholder',
            'page.event.subtitlePlaceholder',
            'page.event.iconPlaceholder',
            'page.event.descriptionPlaceholder',
            'page.event.imagePlaceholder',
            'general.description'
        ]).
        pipe(takeUntil(this.destroy$)).
        subscribe((translations: Array<string>) =>
        {
            this.itemHeader =
            {
                ...this.itemHeader,
                titlePlaceholder:    translations['page.event.titlePlaceholder'],
                subtitlePlaceholder: translations['page.event.subtitlePlaceholder'],
                iconPlaceholder:     translations['page.event.iconPlaceholder']
            };

            this.itemDescription =
            {
                ...this.itemDescription,
                title:                  translations['general.description'],
                descriptionPlaceholder: translations['page.event.descriptionPlaceholder'],
                imagePlaceholder:       translations['page.event.imagePlaceholder']
            };
        });
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(page: Pages.AssetsClusters | Pages.ImageSelector | Pages.EventLocation)
    {
        this.store.dispatch(new Navigate([page]));
    }
}
