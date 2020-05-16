import { Component, ViewChild } from '@angular/core';
import { MenuController, PopoverController, IonSearchbar } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages, ActionMobileNavigateRoot, ActionMobileAuthSelect, ComponentHomeOptions, ActionSearchAll, StateSearch } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { CoreEnum, BaseComponent } from '@theory/core';
import { StateMobile } from '@firefly/mobile';
import { Observable, from, of } from 'rxjs';
import { StateUserAlerts, StateUser } from '@firefly/core';
import { take, switchMap } from 'rxjs/operators';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { ModulePageSearch, PageSearch } from '../search';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome extends BaseComponent
{
    @Select(StateMobile.menuOpen)        menuOpen$      : Observable<boolean>;
    @Select(StateMobile.pageAlerts)      pageAlerts$    : Observable<boolean>;
    @Select(StateMobile.pageStream)      pageStream$    : Observable<boolean>;
    @Select(StateUserAlerts.unreadCount) unread$        : Observable<number>;
    @Select(StateUserAlerts.hasUnread)   hasUnread$     : Observable<boolean>;
    @Select(StateUser.authenticated)     authenticated$ : Observable<boolean>;

    @ViewChild(IonSearchbar, { static: false })
    private searchbar: IonSearchbar;

    public searching: boolean = false;

    public Pages : any = Pages;

    public searchClient = algoliaSearch('8NDQ1FNIDU','45b11751dc7e276f781a85f719abda66');
    public index: SearchIndex = this.searchClient.initIndex('interests');


    constructor
    (
        private menu    : MenuController,
        private store   : Store,
        private popover : PopoverController
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
        this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, type));
    }

    public menuOpen(): void
    {
        this.authenticated$.pipe
        (
            take(1),
            switchMap((authenticated: boolean) =>
                authenticated ?
                    from(this.menu.open()) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }

    public async showPopover(event: any): Promise<void>
    {
        const popover: HTMLIonPopoverElement = await this.popover.create
        ({
            component: ComponentHomeOptions,
            componentProps:
            {
                interestType : this.store.selectSnapshot(StateUser.interestType),
                eventType    : this.store.selectSnapshot(StateUser.eventType),
                isStream     : this.store.selectSnapshot(StateMobile.pageStream)
            },
            event,
            translucent: true
        });

        return await popover.present();
    }

    public searchShow(show: boolean): void
    {
        this.searching = show;

        if (show)
        {
            this.searchbar.setFocus();
        }
    }

    public search(event: CustomEvent)
    {
        console.log(`ToDo: implement simple search/filter`)
        console.log(`      ${event.detail.value}`);

        if(event.detail.value.length < 3)
          return;

        this.store.dispatch(new ActionSearchAll(event.detail.value)).pipe(
          switchMap(() =>
            from(this.popover.create({
              component: PageSearch,
              event,
              keyboardClose: false,
              translucent: true,
              showBackdrop: false
            }))
          )
        ).subscribe((popover: HTMLIonPopoverElement) =>{

          //popover.present();
          //this.searchbar.setFocus();
        }
        );
    }
}
