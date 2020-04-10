import { FirebaseDocument } from '../interfaces';
import { MetadataInterest } from '../models';

export interface Interest extends FirebaseDocument
{
    bucketPath      : string;
    description     : string;
    name            : string;
    private         : boolean;
    subscriberCount : number;
    tagline         : string;

    metadata : MetadataInterest;
}
