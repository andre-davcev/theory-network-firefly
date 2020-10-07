import { Component, ViewChild } from '@angular/core';
import { MenuController, PopoverController, IonSearchbar, ModalController } from '@ionic/angular';
import { Store, Select } from '@ngxs/store';
import { StatusBarStyle } from '@capacitor/core';

import { ActionDeviceStatusBarSet } from '@theory/capacitor';

import { Pages, ActionMobileNavigateRoot, ActionMobileAuthSelect, ComponentHomeOptions, ActionSearchReset, ActionSearchInterests, ActionSearchEvents } from '@firefly/mobile';
import { Navigate } from '@ngxs/router-plugin';
import { CoreEnum, BaseComponent } from '@theory/core';
import { StateMobile } from '@firefly/mobile';
import { Observable, from, of } from 'rxjs';
import { StateUserAlerts, StateUser } from '@firefly/core';
import { take, switchMap } from 'rxjs/operators';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { PageAlert } from '../alert';

@Component
({
    selector    : 'app-page-home',
    templateUrl : 'home.page.html',
    styleUrls   : ['./home.page.scss']
})

export class PageHome extends BaseComponent
{
    @Select(StateMobile.menuOpen)        menuOpen$      : Observable<boolean>;
    @Select(StateUserAlerts.unreadCount) unread$        : Observable<number>;
    @Select(StateUserAlerts.hasUnread)   hasUnread$     : Observable<boolean>;
    @Select(StateUser.authenticated)     authenticated$ : Observable<boolean>;
    @Select(StateUser.isUser)            isUser$        : Observable<boolean>;

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
        private popover : PopoverController,
        private modal   : ModalController
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
        if (type === Pages.Alert)
        {
            from(this.modal.create({ component: PageAlert })).
            subscribe((modal: HTMLIonModalElement) =>
                modal.present()
            );
        }
        else
        {
            this.store.dispatch(new ActionMobileNavigateRoot(Pages.Home, type));
        }
    }

    public menuOpen(): void
    {
        this.isUser$.pipe
        (
            take(1),
            switchMap((isUser: boolean) =>
                isUser ?
                    from(this.menu.open()) :
                    this.store.dispatch(new ActionMobileAuthSelect())
            )
        ).
        subscribe();
    }

    public async showPopover(event: any): Promise<void>
    {
        const isStream: boolean = this.store.selectSnapshot(StateMobile.pageStream);

        const popover: HTMLIonPopoverElement = await this.popover.create
        ({
            component: ComponentHomeOptions,
            componentProps:
            {
                interestType : this.store.selectSnapshot(StateUser.interestType),
                eventType    : this.store.selectSnapshot(StateUser.eventType),
                isStream,
                virtual      : isStream ?
                                  this.store.selectSnapshot(StateUser.interestVirtual) :
                                  this.store.selectSnapshot(StateUser.eventVirtual)

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

    public cancel(): void
    {
      this.store.dispatch(new ActionSearchReset()).subscribe();
    }

    public search(event: CustomEvent)
    {
        if(event.detail.value.length < 3)
          return;

        const pageStream : boolean = this.store.selectSnapshot(StateMobile.pageStream);
        const pageAlerts : boolean = this.store.selectSnapshot(StateMobile.pageAlerts);

        return pageStream ? this.store.dispatch(new ActionSearchInterests(event.detail.value)).subscribe()
          : pageAlerts ? this.store.dispatch(new ActionSearchEvents(event.detail.value)).subscribe()
          : of(null);
    }
}
