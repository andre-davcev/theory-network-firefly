import { Place } from '../models';
import { MetadataList } from './list.metadata';

export interface MetadataEvent extends MetadataList
{
    score? : number;
    icon?  : string;
    image? : string;
    place? : Place;
}
