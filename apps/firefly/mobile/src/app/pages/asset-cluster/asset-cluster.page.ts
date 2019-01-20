import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TranslateService } from '@ngx-translate/core';
import { StatusBarStyle } from '@capacitor/core';

import { BaseComponent } from '@theory/core';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateCluster, ActionSetClusterId } from '@firefly/core';
import { ItemHeader, ItemDescription } from '@firefly/mobile';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-asset-cluster',
    templateUrl : 'asset-cluster.page.html',
    styleUrls   : ['./asset-cluster.page.scss']
})

export class PageAssetCluster extends BaseComponent
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    public itemHeader: ItemHeader =
    {
        title:        'name',
        subtitle:     'tagline',
        iconUrlEmpty: 'assets/icons/avatar-empty.svg'
    };

    public itemDescription: ItemDescription =
    {        
        description: 'description'
    };

    constructor(private store: Store, private translate: TranslateService)
    {
        super();

        this.store.dispatch(new ActionSetClusterId('new'));

        this.translate.get
        ([
            'page.cluster.titlePlaceholder',
            'page.cluster.subtitlePlaceholder',
            'page.cluster.iconPlaceholder',
            'page.cluster.descriptionPlaceholder',            
            'general.description'
        ]).
        pipe(takeUntil(this.destroy$)).
        subscribe((translations: Array<string>) =>
        {
            this.itemHeader =
            {
                ...this.itemHeader,
                titlePlaceholder:    translations['page.cluster.titlePlaceholder'],
                subtitlePlaceholder: translations['page.cluster.subtitlePlaceholder'],
                iconPlaceholder:     translations['page.cluster.iconPlaceholder']
            };

            this.itemDescription =
            {
                ...this.itemDescription,
                title:                  translations['general.description'],
                descriptionPlaceholder: translations['page.cluster.descriptionPlaceholder']                
            };
        });
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public iconClicked(): void
    {
        this.store.dispatch(new Navigate([Pages.IconSelector]));
    }

    public imageClicked(): void
    {
        this.store.dispatch(new Navigate([Pages.ImageSelector]));
    }
}
