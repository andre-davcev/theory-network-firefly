import { GeocodeFeature } from '../interfaces/geocode-feature.interface';

export interface ResponseGeocode
{
    type:        string;
    query:       Array<string>;
    features:    GeocodeFeature;
    attribution: string;
}
