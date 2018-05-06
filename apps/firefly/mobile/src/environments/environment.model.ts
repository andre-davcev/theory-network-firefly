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
    places   : EnvironmentAPI;
}

export interface EnvironmentAPI
{
    apiKey: string;
}

export interface EnvironmentAccessToken
{
    accessToken: string;
}

export interface EnvironmentFirebase extends EnvironmentAPI
{
    authDomain        : string;
    databaseURL       : string;
    projectId         : string;
    storageBucket     : string;
    messagingSenderId : string;
}


