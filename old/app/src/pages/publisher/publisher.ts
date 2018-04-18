import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {IonicPage}     from 'ionic-angular';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-publisher',
    templateUrl : 'publisher.html'
})

export class PagePublisher extends Page
{
    public segment:string = 'clusters';

    constructor(private nav:NavController)
    {
        super();
    }

    public add()
    {
        const segment:string = this.segment.substring(0, this.segment.length - 1);
        const page:string = 'PagePublisher' + segment.charAt(0).toUpperCase() + segment.slice(1);
        
        this.nav.push(page);
    }
}