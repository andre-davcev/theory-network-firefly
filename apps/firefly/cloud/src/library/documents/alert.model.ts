import { Event } from './event.model';
import { MetadataAlert } from '../models';

export interface Alert extends Event
{
    eventId : string;
    read    : boolean;
    tokens  : Array<string>;

    metadata? : MetadataAlert;
}
