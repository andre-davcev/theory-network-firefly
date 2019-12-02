import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    name        : string;
    description : string;
    bucketPath  : string;
    eventId     : string;
    clusterId   : string;
    dateTime    : string;
    url?        : string;
    read        : boolean;
}
