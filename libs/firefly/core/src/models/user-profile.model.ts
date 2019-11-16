import { Model } from '@theory/firebase';

export interface UserProfile extends Model
{
    nameFirst   : string;
    nameLast    : string;
    photoUrl    : string;
    companyName : string;
    isCompany   : boolean;
}
