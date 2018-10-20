import { FoursquarePhoto } from './foursquare-photo.interface';

export interface FoursquarePhotoGroup
{
    type  : string;
    name  : string;
    count : number;
    items : Array<FoursquarePhoto>;
}
