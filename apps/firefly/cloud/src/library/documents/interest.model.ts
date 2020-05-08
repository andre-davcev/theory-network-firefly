import { FirebaseDocument } from '../interfaces';
import { MetadataInterest } from '../metadata';

export interface Interest extends FirebaseDocument
{
    description     : string;
    name            : string;
    private         : boolean;
    subscriberCount : number;
    tagline         : string;

    metadata : MetadataInterest;
}
