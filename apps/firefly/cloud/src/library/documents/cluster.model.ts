import { FirebaseDocument } from '../interfaces';

export interface Cluster extends FirebaseDocument
{
    bucketPath      : string;
    description     : string;
    name            : string;
    private         : boolean;
    subscriberCount : number;
    tagline         : string;
}
