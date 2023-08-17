import { Environment } from './interfaces';

export const EnvironmentDev: Environment = {
  production: false,
  environment: 'dev',
  language: 'en',
  pathJson: 'data',

  apis: {
    firebase: {
      apiKey: '***REMOVED-FIREBASE-API-KEY***',
      authDomain: '1388625286411.firebaseapp.com',
      databaseURL: 'https://1388625286411.firebaseio.com',
      projectId: 'project-4334231676697990915',
      storageBucket: 'project-4334231676697990915.appspot.com',
      messagingSenderId: '671375922961',
      appId: '1:671375922961:web:0eff43de822fd523a05eb0',
      measurementId: 'G-W7RLRCN9N4'
    },

    mapbox: {
      accessToken:
        '***REMOVED-MAPBOX-TOKEN***'
    }
  }
};
