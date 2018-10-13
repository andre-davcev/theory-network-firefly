import { FoursquareUserShort } from '.';

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
