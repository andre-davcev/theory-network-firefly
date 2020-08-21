import { Place } from '../models';

export interface MetadataEvent
{
    score? : number;
    icon?  : string;
    image? : string;
    place? : Place;
}
