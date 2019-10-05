import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    userId  : string;
    eventId : string;
    imageId : string;
    title   : string;
    body    : string;
    read    : boolean;
    date    : string;
    url?    : string;
}
