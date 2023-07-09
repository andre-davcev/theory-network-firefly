import { GeocodeFeature } from '../interfaces';

export interface ResponseGeocode {
  type: string;
  query: Array<number>;
  features: Array<GeocodeFeature>;
  attribution: string;
}
