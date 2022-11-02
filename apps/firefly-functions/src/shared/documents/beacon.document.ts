import { FirebaseDocument } from '../../library/interfaces';

export interface Beacon extends FirebaseDocument
{
    description : string;
    name        : string;
    major       : number;
    majorLabel  : string;
    minor       : number;
    minorLabel  : string;
    tagline     : string;
    uuid        : string;
    uuidLabel   : string;
}
