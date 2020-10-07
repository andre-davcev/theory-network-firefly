import { firestore } from 'firebase/app';

import { CityInfo } from '@firefly/cloud';

export interface StateCityModel
{
    city     : CityInfo;
    isNew    : boolean;
    geopoint : firestore.GeoPoint;
}
