import { Model } from '@theory/firebase';

export interface Asset extends Model
{
    name        : string;
    private     : boolean;
    draft       : boolean;
    description : string;
    bucketPath? : string;
}
