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
            apiKey: 'AIzaSyDA3InhwoYDZy5fDFhE_JlBKQoO2ucS_B0'
        },

        maps :
        {
            accessToken: 'pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg'
        }
    }
};
