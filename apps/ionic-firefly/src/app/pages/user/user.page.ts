import { Component } from '@angular/core';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser
{
    public segment: string = 'assets';

    constructor()
    {

    }

    public segmentChanged(segment: string)
    {
        this.segment = segment;
    }
}
