import { Model } from '@theory/firebase';

export interface UserStream extends Model
{
    data: Array<string>;
}
