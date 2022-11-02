import { FirebaseDocument } from '../../library/interfaces';
import { MetadataInterest } from '../../library/metadata';

export interface Interest extends FirebaseDocument
{
    description     : string;
    name            : string;
    private         : boolean;
    subscriberCount : number;
    tagline         : string;
    virtual         : boolean;

    metadata : MetadataInterest;
}
