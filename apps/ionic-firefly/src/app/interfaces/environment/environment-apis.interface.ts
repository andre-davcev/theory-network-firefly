import { EnvironmentFirebase } from './environment-firebase.interface';
import { EnvironmentAccessToken } from './environment-access-token.interface';
import { EnvironmentPlaces } from './environment-places.interface';

export interface EnvironmentApis
{
    firebase : EnvironmentFirebase;
    maps     : EnvironmentAccessToken;
    places   : EnvironmentPlaces;
}
