import { FirebaseDocument } from '../interfaces';

export interface UserProfile extends FirebaseDocument
{
    bucketPath  : string;
    companyName : string;
    isCompany   : boolean;
    nameFirst   : string;
    nameLast    : string;
}
