import { Injectable } from '@angular/core';

import { Alert } from '../models/alert.model';
import { Subscription } from '../models/subscription.model';

@Injectable({providedIn: 'root'})
export class ServiceTemp
{
    alerts:Array<Alert> =
    [
        {
            image : 'temp/images/alerts/rusted.root.jpg',
            title : 'Rusted Root',
            body  : "Sahlen's Music Stage",
            read  : false,
            date  : 'May 12, 2017 at 7:00pm'
        },

        {
            image : 'temp/images/alerts/foster.the.people.jpg',
            title : 'Foster The People',
            body  : "Ommegang Brewery Cooperstown",
            read  : false,
            date  : 'June 10, 2017 at 7:00pm'
        },

        {
            image : 'temp/images/alerts/blondie.jpg',
            title : 'Blondie',
            body  : "Artpark",
            read  : false,
            date  : 'July 25, 2016 at 6:30pm'
        }
    ];

    subscriptions:Array<Subscription> =
    [
        {
            name        : 'Pokemon Go Rochester Nests',
            tagline     : 'Get alerts for all your favorite Pokemon nests',
            description : '',
            icon        : 'temp/icons/icon.java.1.png',
            photo       : 'temp/images/subscriptions/pokemon-go.jpg',
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
            icon        : 'temp/icons/icon.java.2.png',
            photo       : 'temp/images/subscriptions/lilac-festival.jpg',
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
            icon        : 'temp/icons/icon.java.3.png',
            photo       : 'temp/images/subscriptions/lollapalooza.png',
            categories  : '',
            private     : false,
            locations   : [],
            subscribed  : false,
            draft       : false,
            userId      : ''
        }
    ];

    constructor()
    {

    }
}
