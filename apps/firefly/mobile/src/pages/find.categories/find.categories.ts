import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-find-categories',
    templateUrl : 'find.categories.html'
})

export class PageFindCategories extends Page
{
    constructor()
    {
        super();
    }
}