import { Environment } from './interfaces';

export const EnvironmentDev: Environment =
{
    production  : false,
    environment : 'dev',
    language    : 'en',
    pathJson    : 'data',

    apis :
    {
        firebase :
        {
            apiKey: 'AIzaSyDqM7J1yj-F_KVZvVo4DTWJh3ARbnt_c4w',
            authDomain: '1388625286411.firebaseapp.com',
            databaseURL: 'https://1388625286411.firebaseio.com',
            projectId: 'project-4334231676697990915',
            storageBucket: 'project-4334231676697990915.appspot.com',
            messagingSenderId: '671375922961',
            appId: '1:671375922961:web:0eff43de822fd523a05eb0'
        },

        mapbox :
        {
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        }
    }
};
