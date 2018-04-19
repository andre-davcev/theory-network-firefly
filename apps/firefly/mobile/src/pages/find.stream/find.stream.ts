import {Component} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Subscription} from '../../models/subscription';
import {Temp}         from '../../services/temp';

import {Page} from '../page';

@IonicPage()
@Component
({
    selector    : 'app-page-find-stream',
    templateUrl : 'find.stream.html'
})

export class PageFindStream extends Page
{
    public subscriptions:Array<Subscription> = [];
    
    constructor(temp:Temp)
    {
        super();

        this.subscriptions = temp.subscriptions;
    }

    public doInfinite(infiniteScroll:any)
    {
        console.log('Begin async operation');

        setTimeout(() =>
        {
            for (let i = 0; i < 30; i++)
            {
                this.subscriptions.push(this.subscriptions[i]);
            }

            console.log('Async operation has ended');
      
            infiniteScroll.complete();
        }, 500);
    }

    public subscribe(subscription:Subscription)
    {
        subscription.subscribed = !subscription.subscribed;
    }
}