import { Model } from './model';

export interface Notification extends Model
{
    title : string;
    body  : string;
    image : string;
    read  : boolean;

    date: string;
}
