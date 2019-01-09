import { Model } from '@theory/firebase';

export interface Asset extends Model
{
    name        : string;
    description : string;
    private     : boolean;
    userId?     : string;
    draft?      : boolean;
}
