import { Model } from '@theory/firebase';

export interface Asset extends Model
{
    userId?     : string;
    private     : boolean;
    draft       : boolean;
    name        : string;
    description : string;
    bucketPath? : string;
}
