import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    userId      : string;
    name        : string;
    description : string;
    bucketPath  : string;

    eventId : string;
    read    : boolean;
    date    : string;
    url?    : string;
}
