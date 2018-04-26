import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.html'
})

export class PageUser
{
    segment:string = 'profile';
}
