import {Model} from './model';

export interface Beacon extends Model
{
    major      : number;
    majorLabel : string;
    minor      : number;
    minorLabel : string;
    uuid       : string;
    uuidLabel  : string;
}