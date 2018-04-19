import {Model} from './model';

export interface Alert extends Model
{
    image  : string,
    title  : string,
    short  : string,
    date   : string,
    viewed : boolean
}