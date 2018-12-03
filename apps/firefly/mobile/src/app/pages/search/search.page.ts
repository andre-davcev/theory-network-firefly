import { Component } from '@angular/core';
import { StatusBarStyle } from '@capacitor/core';

import { StatusBar } from '@theory/capacitor';

@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch
{
    constructor()
    {

    }

    ionViewWillEnter()
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }

    public dismiss(): void
    {
        StatusBar.setStyle({style: StatusBarStyle.Light});
    }
}
