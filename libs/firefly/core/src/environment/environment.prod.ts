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
            apiKey            : '***REMOVED-FIREBASE-API-KEY***',
            authDomain        : 'firefly-b1072.firebaseapp.com',
            databaseURL       : 'https://firefly-b1072.firebaseio.com',
            projectId         : 'firefly-b1072',
            storageBucket     : 'firefly-b1072.appspot.com',
            messagingSenderId : '827673030572'
        },

        mapbox :
        {
            accessToken: '***REMOVED-MAPBOX-TOKEN***'
        }
    }
};
