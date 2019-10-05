import { Alert } from '@firefly/core/models';

export const MockAlerts: Array<Alert> =
[
    {
        id      : '1',
        url     : 'assets/images/temp-notifications-blondie.jpg',
        eventId : 'a',
        imageId : 'assets/images/temp-notifications-blondie.jpg',
        title   : 'Blondie',
        body    : "Artpark",
        read    : false,
        date    : 'July 25, 2016 at 6:30pm',
        userId  : 'username'
    },

    {
        id      : '2',
        url     : 'assets/images/temp-notifications-foster.the.people.jpg',
        eventId : 'b',
        imageId : 'assets/images/temp-notifications-blondie.jpg',
        title   : 'Foster The People',
        body    : "Ommegang Brewery Cooperstown",
        read    : false,
        date    : 'June 10, 2017 at 7:00pm',
        userId  : 'username'
    },

    {
        id      : '3',
        url     : 'assets/images/temp-notifications-rusted.root.jpg',
        eventId : 'c',
        imageId : 'assets/images/temp-notifications-blondie.jpg',
        title   : 'Rusted Root',
        body    : "Sahlen's Music Stage",
        read    : false,
        date    : 'May 12, 2017 at 7:00pm',
        userId  : 'username'
    }
];
