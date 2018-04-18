import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-find-discover',
    templateUrl : 'find.discover.html'
})

export class PageFindDiscover extends Page
{
    public latitude:number  = 43.1269154;
    public longitude:number = -77.5947578;

    constructor()
    {
        super();
    }
}