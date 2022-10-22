import { GeoPoint } from '@theory/firebase';

import { CityInfo } from '@firefly/cloud';

export interface StateCityModel
{
    city     : CityInfo;
    isNew    : boolean;
    geopoint : GeoPoint;
}
