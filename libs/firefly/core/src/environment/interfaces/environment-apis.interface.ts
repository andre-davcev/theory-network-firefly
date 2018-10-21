
import { EnvironmentFirebase } from '@theory/firebase';
import { EnvironmentMapbox } from '@theory/mapbox';
import { EnvironmentPlaces } from '@theory/google';

export interface EnvironmentApis
{
    firebase : EnvironmentFirebase;
    places   : EnvironmentPlaces;
    mapbox   : EnvironmentMapbox;
}
