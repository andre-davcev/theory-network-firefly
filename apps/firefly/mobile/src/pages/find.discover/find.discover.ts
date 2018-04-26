import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component
({
    selector    : 'app-page-find-discover',
    templateUrl : 'find.discover.html'
})

export class PageFindDiscover
{
    public latitude:number  = 43.1269154;
    public longitude:number = -77.5947578;
}
