import { Environment } from './environment.model';

export const environment: Environment =
{
    production : false,
    language   : 'en',
    version    : '0.0.0',
    pathJson   : 'data',

    apis :
    {
        firebase :
        {
            apiKey            : 'AIzaSyD0SxN-pAm8XbaseGjjuToejWrQSJTdwYs',
            authDomain        : '1388625286411.firebaseapp.com',
            databaseURL       : 'https://1388625286411.firebaseio.com',
            projectId         : 'project-4334231676697990915',
            storageBucket     : 'project-4334231676697990915.appspot.com',
            messagingSenderId : '671375922961'
        },

        places :
        {
            clientId     : '0OTN4VI0TZMQGRTJPWOUVDYUJK0VHH3YCDRQO0CAEUKG43FI',
            clientSecret : 'B0OICO4SNQ1EXRKWZSZ0JN0K3QXZCSUBP3PS1MN1NFC4YPQD',
            url          : 'https://api.foursquare.com/v2/venues'
        },

        maps :
        {
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        }
    }
};
