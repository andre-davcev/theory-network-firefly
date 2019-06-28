import { Model } from '@theory/firebase';

export interface UserClusters extends Model
{
    data:  Record<string, string>;
}
