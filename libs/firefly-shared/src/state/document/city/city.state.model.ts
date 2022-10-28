import { GeoPoint } from 'firebase/firestore';

import { CityInfo } from '@firefly/cloud';

export interface StateCityModel
{
    city     : CityInfo;
    isNew    : boolean;
    geopoint : GeoPoint;
}
