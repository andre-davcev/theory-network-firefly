import { FoursquareGroups } from '.';

export interface FoursquareUser
{
    id: string;
    firstName: string;
    gender: string;
    photo: {prefix: string; suffix;};
    type: string;
    tips: {count: number;};
    lists: {groups: Array<FoursquareGroups>;};
    homeCity: string;
    bio: string;
    contact: {twitter: string; facebook: string;};
}
