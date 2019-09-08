import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    title   : string;
    body    : string;
    imageId : string;
    read    : boolean;
}
