import {Component, ViewChild} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import {Storage}                               from '@ionic/storage';

import {PageTabs}  from '../pages/tabs/tabs';
import {PageLogin} from '../pages/auth/auth';
import { Store } from '@ngxs/store';
import { AppInitialize } from '../state/app/app.actions';

export interface PageInterface
{
    title         : string;
    name          : string;
    component     : any;
    icon          : string;
    index?        : number;
    tabName?      : string;
    tabComponent? : any;
}

@Component
({
    templateUrl: 'app.html'
})

export class App
{
    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav)
    public nav: Nav;

    loggedInPages : PageInterface[] =
    [
        {title: 'Logout', name: 'TabsPage', component: PageTabs, icon: 'log-out'}
    ];

    loggedOutPages : PageInterface[] =
    [
        {title: 'Login',  name: 'LoginPage', component : PageLogin,  icon: 'log-in'}
    ];

    rootPage:string;

    constructor
    (
        private events    : Events,
        private menu      : MenuController,
        private platform  : Platform,
        private storage   : Storage,
        private translate : TranslateService,
        private store     : Store
    )
    {
        this.rootPage = 'PageLogin';

        this.store.dispatch(new AppInitialize());

/*
        // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial').then((hasSeenTutorial) =>
        {
            this.rootPage = 'PageLogin';

            if (hasSeenTutorial)
            {
//                this.rootPage = 'LoginPage';
            }
            else
            {
//                this.rootPage = 'TutorialPage';
            }

            this.platformReady()
        });
*/
    }

    openPage(page:PageInterface)
    {
        let params = {};

        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index)
        {
            params = {tabIndex: page.index};
        }

        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNav() && page.index != undefined)
        {
            // Set the root of the nav with params if it's a tab index
            this.nav.getActiveChildNav().select(page.index);
        }
        else
        {
            this.nav.setRoot(page.name, params).catch((err: any) =>
            {
                console.log(`Didn't set nav root: ${err}`);
            });
        }
    }

    isActive(page: PageInterface)
    {
        let childNav = this.nav.getActiveChildNavs()[0];

        // Tabs are a special case because they have their own navigation
        if (childNav)
        {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabName)
            {
                return 'primary';
            }

            return;
        }

        if (this.nav.getActive() && this.nav.getActive().name === page.name)
        {
            return 'primary';
        }

        return;
    }
}
