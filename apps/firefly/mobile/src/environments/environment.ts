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
            apiKey            : '***REMOVED-FIREBASE-API-KEY***',
            authDomain        : '1388625286411.firebaseapp.com',
            databaseURL       : 'https://1388625286411.firebaseio.com',
            projectId         : 'project-4334231676697990915',
            storageBucket     : 'project-4334231676697990915.appspot.com',
            messagingSenderId : '671375922961'
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
