import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-user-settings',
    templateUrl : 'user.settings.html'
})

export class PageUserSettings extends Page
{
    constructor()
    {
        super();        
    }
}