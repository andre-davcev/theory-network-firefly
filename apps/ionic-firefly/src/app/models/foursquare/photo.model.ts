import { UserShort } from './user-short.model';

export interface Photo
{
    id         : string;
    createdAt  : number;
    source     : {name: string; url: string;};
    prefix     : string;
    suffix     : string;
    width      : number;
    height     : number;
    user?      : UserShort;
    visibility : string;
}
