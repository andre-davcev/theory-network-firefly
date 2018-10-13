import { FoursquarePhoto } from '.';

export interface FoursquarePhotoGroup
{
    type  : string;
    name  : string;
    count : number;
    items : Array<FoursquarePhoto>;
}
