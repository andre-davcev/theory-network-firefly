import { GeocodeFeature } from '../interfaces/geocode-feature.interface';

export interface ResponseGeocode
{
    type:        string;
    query:       Array<number>;
    features:    Array<GeocodeFeature>;
    attribution: string;
}
