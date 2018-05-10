export interface Environment
{
    production : boolean;
    language   : string;
    version    : string;
    pathJson   : string;
    apis       : EnvironmentApis;
};

export interface EnvironmentApis
{
    firebase : EnvironmentFirebase;
    maps     : EnvironmentAccessToken;
    places   : EnvironmentPlaces;
}

export interface EnvironmentPlaces
{
    clientId     : string;
    clientSecret : string;
    url          : string;
}

export interface EnvironmentAccessToken
{
    accessToken: string;
}

export interface EnvironmentFirebase
{
    apiKey            : string;
    authDomain        : string;
    databaseURL       : string;
    projectId         : string;
    storageBucket     : string;
    messagingSenderId : string;
}


