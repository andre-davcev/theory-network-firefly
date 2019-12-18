import { FirebaseDocument } from '../interfaces';

export interface Beacon extends FirebaseDocument
{
    name        : string;
    tagline     : string;
    description : string;

    major       : number;
    majorLabel  : string;
    minor       : number;
    minorLabel  : string;
    uuid        : string;
    uuidLabel   : string;
}
