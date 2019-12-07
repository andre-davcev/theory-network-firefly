import { Document } from '@theory/firebase';

export interface Asset extends Document
{
    name        : string;
    private     : boolean;
    draft       : boolean;
    description : string;
    bucketPath? : string;
}
