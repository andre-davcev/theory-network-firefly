import { FirebaseDocument } from '../interfaces';

export interface Interest extends FirebaseDocument
{
    bucketPath      : string;
    description     : string;
    name            : string;
    private         : boolean;
    subscriberCount : number;
    tagline         : string;
}
