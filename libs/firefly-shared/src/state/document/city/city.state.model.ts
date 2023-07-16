import { GeoPoint } from '@angular/fire/firestore';

import { CityInfo } from '@firefly/cloud';

export interface StateCityModel {
  city: CityInfo | null;
  isNew: boolean;
  geopoint: GeoPoint | null;
}
