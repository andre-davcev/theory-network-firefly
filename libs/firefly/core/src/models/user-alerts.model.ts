import { Model } from '@theory/firebase';

export interface UserAlerts extends Model
{
    unread:  Array<string>;
    read:    Array<string>;
    deleted: Array<string>;
}

