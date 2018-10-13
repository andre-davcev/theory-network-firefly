import { EnvironmentFirebase, EnvironmentAccessToken, EnvironmentPlaces } from '@firefly/mobile';

export interface EnvironmentApis
{
    firebase : EnvironmentFirebase;
    maps     : EnvironmentAccessToken;
    places   : EnvironmentPlaces;
}
