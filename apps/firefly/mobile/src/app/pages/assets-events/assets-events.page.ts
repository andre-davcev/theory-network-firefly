import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StateUserEvents, ActionEventSetId } from '@firefly/core';
import { Event } from '@firefly/cloud';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Pages } from '../pages.enum';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';

@Component
({
    selector    : 'app-page-assets-events',
    templateUrl : 'assets-events.page.html',
    styleUrls   : ['./assets-events.page.scss']
})

export class PageAssetsEvents
{
    @Select(StateUserEvents.data)  list$: Observable<Array<Event>>;
    @Select(StateUserEvents.found) found: Observable<boolean>;

    constructor( private store: Store) { }

    add(): void
    {
        this.store.dispatch(new Navigate([Pages.AssetEvent]));
    }

    ionViewWillEnter()
    {
        this.store.dispatch
        ([
            new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark})
        ]);
    }

    public select(object: Event): void
    {
        this.store.dispatch(new ActionEventSetId(object.id));
    }
}
