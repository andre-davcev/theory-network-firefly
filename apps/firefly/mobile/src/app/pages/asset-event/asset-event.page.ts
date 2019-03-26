import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { StatusBarStyle } from '@capacitor/core';
import { takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ModalOptions, ComponentRef } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateEvent, ActionEventSetId } from '@firefly/core';
import { BaseComponent } from '@theory/core';
import { ItemHeader, ItemDescription, ItemImage } from '@firefly/mobile';
import { Pages } from '../pages.enum';
import { PageEventLocation } from '../event-location';
import { PageImageSelector } from '../image-selector';

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
        description: 'description'
    };

    public itemImage: ItemImage =
    {
        imageAsUrl: true
    }

    constructor(private store: Store, private translate: TranslateService, public modalController: ModalController)
    {
        super();

        this.store.dispatch(new ActionEventSetId('new'));

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
                descriptionPlaceholder: translations['page.event.descriptionPlaceholder']
            };

            this.itemImage =
            {
                ...this.itemImage,
                imagePlaceholder:       translations['page.event.imagePlaceholder']
            }
        });
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public navigate(page: Pages.AssetsClusters | Pages.ImageSelector | Pages.EventLocation)
    {
        if (page === Pages.AssetsClusters)
        {
            this.store.dispatch
            ([
                new ActionEventSetId(),
                new Navigate([page])
            ]);
        }
        else
        {
            let modalOptions: ModalOptions<ComponentRef>;

            if (page === Pages.ImageSelector) { modalOptions = { component: PageImageSelector}; }
            if (page === Pages.EventLocation) { modalOptions = { component: PageEventLocation}; }

            from(this.modalController.create(modalOptions)).
            subscribe((modal: HTMLIonModalElement) => modal.present());
        }
    }
}
