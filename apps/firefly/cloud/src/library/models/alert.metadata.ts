import { MetadataEvent } from './event.metadata';

export interface MetadataAlert extends MetadataEvent
{
    dateTimeDate? : Date;
    sessionRead?  : boolean;
    index?        : number;
}
