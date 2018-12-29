import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateCluster, ActionSetClusterId } from '@firefly/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@theory/core';
import { takeUntil } from 'rxjs/operators';
import { ItemHeader } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { Pages } from '../pages.enum';

@Component
({
    selector    : 'app-page-publish-event',
    templateUrl : 'publish-event.page.html',
    styleUrls   : ['./publish-event.page.scss']
})

export class PagePublishEvent extends BaseComponent
{
    @Select(StateCluster.form) form$: Observable<FormGroup>;

    public itemHeader: ItemHeader =
    {
        title:        'name',
        subtitle:     'tagline',
        iconUrlEmpty: 'assets/icons/avatar-empty.svg'
    };

    constructor(private store: Store, private translate: TranslateService)
    {
        super();

        this.store.dispatch(new ActionSetClusterId('new'));

        this.translate.get
        ([
            'page.event.titlePlaceholder',
            'page.event.subtitlePlaceholder',
            'page.event.iconPlaceholder'
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
        });
    }

    ionViewWillEnter()
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public iconClicked(): void
    {
        this.store.dispatch(new Navigate([Pages.Home, Pages.PublishEvent, Pages.ImageSelector]));
    }
}
