import { DocumentReference } from '@angular/fire/firestore';

import { Model } from '@theory/firebase';

export interface Cluster extends Model
{
    userId?      : string;
    draft?       : boolean;
    name         : string;
    tagline?     : string;
    description  : string;
    icon?        : string;
    photo?       : string;
    categories?  : string;
    private?     : boolean;
    locations?   : Array<DocumentReference>;
}
