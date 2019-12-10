import { LocalityInfo } from '../interfaces';

export interface ResponseReverseGeocode
{
    latitude:                  number;
    longitude:                 number;
    localityLanguageRequested: string;
    countryName:               string;
    countryCode:               string;
    principalSubdivision:      string;
    locality:                  string;
    postcode:                  string;
    localityInfo:              LocalityInfo;
}
