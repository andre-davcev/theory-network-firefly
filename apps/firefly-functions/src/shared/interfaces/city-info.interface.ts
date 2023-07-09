import { GeoPoint } from 'firebase/firestore';

export interface CityInfo {
  id: string;
  name: string;
  country: string;
  geopoint: GeoPoint;
  region: string;
}
