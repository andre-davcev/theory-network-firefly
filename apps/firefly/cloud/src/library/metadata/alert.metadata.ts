import { MetadataEvent } from './event.metadata';
import { Place } from '../models';

export interface MetadataAlert extends MetadataEvent
{
    dateTimeDate? : Date;
    sessionRead?  : boolean;
    index?        : number;
    place?        : Place;
}
