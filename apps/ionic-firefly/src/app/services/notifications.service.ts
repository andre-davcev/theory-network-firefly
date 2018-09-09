import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Notification } from '../models/notification.model';

@Injectable({providedIn: 'root'})
export class ServiceNotifications
{
    constructor() { }

    public get(): Observable<Array<Notification>>
    {
        const notifications: Array<Notification> =
        [
            {
                image : 'assets/images/temp-notifications-rusted.root.jpg',
                title : 'Rusted Root',
                body  : "Sahlen's Music Stage",
                read  : false,
                date  : 'May 12, 2017 at 7:00pm'
            },

            {
                image : 'assets/images/temp-notifications-foster.the.people.jpg',
                title : 'Foster The People',
                body  : "Ommegang Brewery Cooperstown",
                read  : false,
                date  : 'June 10, 2017 at 7:00pm'
            },

            {
                image : 'assets/images/temp-notifications-blondie.jpg',
                title : 'Blondie',
                body  : "Artpark",
                read  : false,
                date  : 'July 25, 2016 at 6:30pm'
            }
        ];

        return of(notifications);
    }
}
