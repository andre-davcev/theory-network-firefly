import { Groups } from './groups.model';

export interface User
{
    id: string;
    firstName: string;
    gender: string;
    photo: {prefix: string; suffix;};
    type: string;
    tips: {count: number;};
    lists: {groups: Array<Groups>;};
    homeCity: string;
    bio: string;
    contact: {twitter: string; facebook: string;};
}
