import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Observable} from 'rxjs/Observable';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-user-profile',
    templateUrl : 'user.profile.html'
})

export class PageUserProfile extends Page
{
    constructor()
    {
        super();        
    }
}