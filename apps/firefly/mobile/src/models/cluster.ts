import * as firebase from 'firebase';

import {Model} from './model';

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
    locations?   : Array<firebase.firestore.DocumentReference>;
}
