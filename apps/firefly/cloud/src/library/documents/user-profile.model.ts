import { FirebaseDocument } from '../interfaces';

export interface UserProfile extends FirebaseDocument
{
    nameFirst   : string;
    nameLast    : string;
    bucketPath  : string;
    companyName : string;
    isCompany   : boolean;
}
