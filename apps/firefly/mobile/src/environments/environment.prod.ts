import { Environment } from './environment.model';

export const environment: Environment =
{
    production : true,
    language   : 'en',
    version    : '0.0.0',
    pathJson   : 'data',

    apis :
    {
        firebase :
        {
            apiKey            : 'AIzaSyBYE4fzg9My7F8W_kLpoSb58NaPvhWhWRc',
            authDomain        : 'firefly-b1072.firebaseapp.com',
            databaseURL       : 'https://firefly-b1072.firebaseio.com',
            projectId         : 'firefly-b1072',
            storageBucket     : 'firefly-b1072.appspot.com',
            messagingSenderId : '827673030572'
        },

        places :
        {
            apiKey: 'AIzaSyCiJwtZoYiPRN3uEsW5B7UqyON9wgNJAZ8'
        },

        maps :
        {
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        }
    }
};
