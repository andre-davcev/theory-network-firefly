import { Model } from '@theory/firebase';

export interface UserSubscriptions extends Model
{
    on:  Record<string, string>;
    off: Record<string, string>;
}
