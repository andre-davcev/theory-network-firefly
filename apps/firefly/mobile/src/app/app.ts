import {Component, ViewChild} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

import {Events, MenuController, Nav, Platform} from 'ionic-angular';
import {SplashScreen}                          from '@ionic-native/splash-screen';
import {Keyboard}                              from '@ionic-native/keyboard';
import {Storage}                               from '@ionic/storage';

import {PageTabs}  from '../pages/tabs/tabs';
import {PageLogin} from '../pages/auth/auth';

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

    constructor(public events:Events, public menu:MenuController, public platform:Platform, public storage:Storage, public splashScreen:SplashScreen, public keyboard:Keyboard, private translate: TranslateService)
    {
        translate.setDefaultLang('en');

        this.rootPage = 'PageLogin';

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
        let
        params = {};

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

    openTutorial()
    {
//        this.nav.setRoot(TutorialPage);
    }

    platformReady()
    {
        if (this.platform.is('cordova'))
        {
            // Call any initial plugins when ready
            this.platform.ready().then(() =>
            {
                this.nav.setRoot(this.rootPage).then(() =>
                {
                    this.splashScreen.hide();
                }); 
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
