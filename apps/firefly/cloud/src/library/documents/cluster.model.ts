import { FirebaseDocument } from '../interfaces';

export interface Cluster extends FirebaseDocument
{
    name            : string;
    tagline         : string;
    description     : string;
    bucketPath      : string;
    private         : boolean;
    subscriberCount : number;
}
