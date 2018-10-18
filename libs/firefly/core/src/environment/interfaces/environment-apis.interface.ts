import { EnvironmentFirebase, EnvironmentAccessToken, EnvironmentPlaces } from '.';

export interface EnvironmentApis
{
    firebase : EnvironmentFirebase;
    maps     : EnvironmentAccessToken;
    places   : EnvironmentPlaces;
}
