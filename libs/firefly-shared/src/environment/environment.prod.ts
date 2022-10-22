import { Environment } from './interfaces';

export const EnvironmentProd: Environment =
{
    production  : true,
    environment : 'prod',
    language    : 'en',
    pathJson    : 'data',

    apis :
    {
        firebase :
        {
            apiKey: 'AIzaSyCiJwtZoYiPRN3uEsW5B7UqyON9wgNJAZ8',
            authDomain: 'firefly-b1072.firebaseapp.com',
            databaseURL: 'https://firefly-b1072.firebaseio.com',
            projectId: 'firefly-b1072',
            storageBucket: 'firefly-b1072.appspot.com',
            messagingSenderId: '827673030572',
            appId: '1:827673030572:web:66d1846e8831e407c99409'
        },

        mapbox :
        {
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        }
    }
};
