import { Model } from './model';

export interface Asset extends Model
{
    name        : string;
    description : string;
    private     : boolean;
    userId?     : string;
    groupId?    : string;
    draft?      : boolean;
}
