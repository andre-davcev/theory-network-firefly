import { FirebaseDocument } from '@theory/firebase';

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
