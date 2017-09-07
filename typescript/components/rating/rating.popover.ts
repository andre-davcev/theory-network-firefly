import {Component} from '@angular/core';

import {NavParams} from 'ionic-angular';

@Component
({
    template :
    `
    <ion-list>
        <ion-row>
            <tn-rating [rating]="rating" [active]="rating == null ? false : true"></tn-rating>
        </ion-row>
    </ion-list>
    `
})

export class TNRatingPopoverPage
{
    rating:number;

    constructor(private navParams:NavParams)
    {
        if (this.navParams.data)
        {
            this.rating = this.navParams.data.rating;
        }
    }

    ngOnInit()
    {

    }
}