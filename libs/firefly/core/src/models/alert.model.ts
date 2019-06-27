import { Model } from '@theory/firebase';

export interface Alert extends Model
{
    title : string;
    body  : string;
    image : string;
    read  : boolean;

    date: string;
}
