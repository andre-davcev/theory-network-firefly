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

        places :
        {
            clientId     : '0OTN4VI0TZMQGRTJPWOUVDYUJK0VHH3YCDRQO0CAEUKG43FI',
            clientSecret : 'B0OICO4SNQ1EXRKWZSZ0JN0K3QXZCSUBP3PS1MN1NFC4YPQD',
            url          : 'https://api.foursquare.com/v2/venues'
        },

        mapbox :
        {
            accessToken: '***REMOVED-MAPBOX-TOKEN***'
        }
    }
};
