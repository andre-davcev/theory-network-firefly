import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Subscription } from '../models/subscription.model';

@Injectable({providedIn: 'root'})
export class ServiceSubscriptions
{
    constructor() { }

    public get(): Observable<Array<Subscription>>
    {
        const subscriptions: Array<Subscription> =
        [
            {
                name        : 'Pokemon Go Rochester Nests',
                tagline     : 'Get alerts for all your favorite Pokemon nests',
                description : '',
                icon        : 'assets/icons/temp-icon.java.1.png',
                photo       : 'assets/images/temp-subscriptions-pokemon-go.jpg',
                categories  : '',
                private     : false,
                locations   : [],
                subscribed  : true,
                draft       : false,
                userId      : ''
            },

            {
                name        : 'Lilac Festival',
                tagline     : 'Alerts about all the Lilac Festival events and activities',
                description : '',
                icon        : 'assets/icons/temp-icon.java.2.png',
                photo       : 'assets/images/temp-subscriptions-lilac-festival.jpg',
                categories  : '',
                private     : false,
                locations   : [],
                subscribed  : false,
                draft       : false,
                userId      : ''
            },

            {
                name        : 'Music Festivals Rochester',
                tagline     : 'Get alerts about Rochester music festivals',
                description : '',
                icon        : 'assets/icons/temp-icon.java.3.png',
                photo       : 'assets/images/temp-subscriptions-lollapalooza.png',
                categories  : '',
                private     : false,
                locations   : [],
                subscribed  : false,
                draft       : false,
                userId      : ''
            }
        ];

        return of(subscriptions);
    }
}
