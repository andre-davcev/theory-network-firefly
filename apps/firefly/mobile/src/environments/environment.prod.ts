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
            apiKey            : '***REMOVED-FIREBASE-API-KEY***',
            authDomain        : 'firefly-b1072.firebaseapp.com',
            databaseURL       : 'https://firefly-b1072.firebaseio.com',
            projectId         : 'firefly-b1072',
            storageBucket     : 'firefly-b1072.appspot.com',
            messagingSenderId : '827673030572'
        },

        places :
        {
            apiKey: '***REMOVED-FIREBASE-API-KEY***'
        },

        maps :
        {
            accessToken: '***REMOVED-MAPBOX-TOKEN***'
        }
    }
};
