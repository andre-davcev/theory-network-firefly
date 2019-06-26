import { Asset } from '../asset';


export interface Beacon extends Asset
{
    major      : number;
    majorLabel : string;
    minor      : number;
    minorLabel : string;
    uuid       : string;
    uuidLabel  : string;
}
