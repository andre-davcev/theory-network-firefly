import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.html'
})

export class PageUser extends Page
{
    segment:string = 'profile';

    constructor()
    {
        super();        
    }
}