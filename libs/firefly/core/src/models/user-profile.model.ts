import { Document } from '@theory/firebase';

export interface UserProfile extends Document
{
    nameFirst   : string;
    nameLast    : string;
    photoUrl    : string;
    companyName : string;
    isCompany   : boolean;
}
