import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    userId  : string;
    title   : string;
    body    : string;
    imageId : string;
    read    : boolean;
    date    : string;
    url?    : string;
}
