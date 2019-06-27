import { Asset } from './asset.model';

export interface Beacon extends Asset
{
    major      : number;
    majorLabel : string;
    minor      : number;
    minorLabel : string;
    uuid       : string;
    uuidLabel  : string;
}
