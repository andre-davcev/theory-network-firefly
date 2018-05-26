import {Model} from './model';

export interface Alert extends Model
{
    title : string;
    body  : string;
    image : string;
    read  : boolean;

    date: string;
}
