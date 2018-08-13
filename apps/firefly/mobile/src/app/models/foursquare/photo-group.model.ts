import { Photo } from './photo.model';

export interface PhotoGroup
{
    type  : string;
    name  : string;
    count : number;
    items : Array<Photo>;
}
