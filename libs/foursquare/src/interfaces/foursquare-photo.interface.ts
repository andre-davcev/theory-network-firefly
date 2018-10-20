import { FoursquareUserShort } from './foursquare-user-short.interface';

export interface FoursquarePhoto
{
    id         : string;
    createdAt  : number;
    source     : {name: string; url: string;};
    prefix     : string;
    suffix     : string;
    width      : number;
    height     : number;
    user?      : FoursquareUserShort;
    visibility : string;
}
