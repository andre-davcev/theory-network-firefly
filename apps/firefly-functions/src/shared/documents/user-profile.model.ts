import { FirebaseDocument } from '../../library/interfaces';

export interface UserProfile extends FirebaseDocument
{
    icon        : string;
    companyName : string;
    isCompany   : boolean;
    nameFirst   : string;
    nameLast    : string;
}
