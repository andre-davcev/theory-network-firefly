import { Document } from '@theory/firebase';

export interface Asset extends Document
{
    userId      : string;
    name        : string;
    private     : boolean;
    draft       : boolean;
    description : string;
    bucketPath? : string;
}
